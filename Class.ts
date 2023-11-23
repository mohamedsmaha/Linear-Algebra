import * as Ts from "./Types"
class Linear_Algebra {
    private Matrices : Ts.Matrices = {}
    Errors : Ts.Errors  = []
    private Helper : Ts.Helper = {
        Get_Matrix_info:(Matrix) =>{
            let Rows    = Matrix.length
            let Columns = Matrix[0].length
            return {Rows  , Columns }
        },
        Get_Matrices_by_Thier_name:(...Matrices_Names) =>{
            let arr = Matrices_Names.map((item) => this.Matrices[item].Data)
            return arr
        },
    }
    private Check_Questions : Ts.Check_Questions = {
        Is_This_Matrix : (...Matrix) => {
            function Check_For_Matrix( Matrix , Number , index){
                if(index >= Matrix.length){return true}
                if(Matrix[index].length != Number){return false}
                return Check_For_Matrix(Matrix ,Number , index + 1)
            }
            function Check_For_array_of_Matrix(index)
            {
                if(index >= Matrix.length){return true}
                if(Matrix[index].length == 0){return false}
                if(!Check_For_Matrix(Matrix[index],Matrix[index][0].length,1)){return false}
                return Check_For_array_of_Matrix( index+1)
            }
            if(Matrix.length <= 0){return false}
            return Check_For_array_of_Matrix(0)

        },
        Is_Those_Same_Size:(...Matrix) =>{
            function Compare(info1:Ts.info , info2:Ts.info){
                if(info1.Rows == info2.Rows && info1.Columns == info2.Columns){return true}
                return false
            }
            let Check=(info : Ts.info, index:number)=>{
                if(index >= Matrix.length){return true}
                if( !Compare(info , this.Helper.Get_Matrix_info(Matrix[index])) ){return false}
                return Check(info , index+1)
            }
            if(Matrix.length == 0){return false}
            return Check(this.Helper.Get_Matrix_info(Matrix[0]) , 1)
        },
        Is_Those_Matrices_exists:(...name) => {
            let arr = name.filter(item => this.Matrices[item] == undefined)
            if(arr.length != 0) {return false}
            return true
        },
    }
    private Matrices_Operations : Ts.Matrices_Operations = {
        Add_Sub:(Operation , ...Matrix:Ts.Matrix[] ) => {
            function Sum_Two_Rows(row1 : Ts.Row , row2 : Ts.Row , Coff){
                return  row1.map<number>((item,index) => item+Coff * row2[index])
            }
            let coff = (Operation == "+") ? 1 : -1
            let arr = Matrix[0] 
            for(let i = 1 ; i < Matrix.length ; i++){
                arr = arr.map((item , index) => Sum_Two_Rows(item , Matrix[i][index] , coff))
            }
            return arr
            
        },
    }
    // Matrices_Operations 
        private Add_Sub:Ts.Add_Sub =(output_name , Operation , image ,...Matrix )=>{
                let Check1 = this.Check_Questions.Is_Those_Matrices_exists(...Matrix)
                if(!Check1){this.Set_Error(image , "Not Exist");return}
                let Matrices = this.Helper.Get_Matrices_by_Thier_name(...Matrix)
                let Check2 = this.Check_Questions.Is_Those_Same_Size(...Matrices)
                if(!Check2){this.Set_Error(image , "Not Same Size");return}
                let value = this.Matrices_Operations.Add_Sub(Operation , ...Matrices)
                this.Set_Matrix(value , output_name)
        }
        Add:Ts.Add_Or_Sub = (output_name , ...Matrix)=>{
                let image  = `Add(${output_name} , ${Matrix})`
                this.Add_Sub(output_name , "+" , image , ...Matrix)
            }
        Sub:Ts.Add_Or_Sub = (output_name , ...Matrix)=>{
                let image  = `Sub(${output_name} , ${Matrix})`
                this.Add_Sub(output_name , "-" , image , ...Matrix)
            }
    // Set Functions
        Set_Error : Ts.Set_Error = (Image , Error_name)=>{
            let text = ""
            let error_in = `Error in ${Image}`
            let Error_array : {[key in Ts.Error_name] : string}= {
                "Not Matrix" : `This Input Matrix is not a Matrix , ${error_in} , Columns Number in Every row Must be the same` ,
                "Not Exist"  : `one of those Matrix not exist , ${error_in} , Use Set_Matrix to insert it`,
                "Not Same Size" : `All those Matrix not in same size , ${error_in} , must be Same size`
            }
            text = Error_array[Error_name]
            this.Errors.push(text)
        }
        Set_Matrix: Ts.Set_Matrix= (Matrix,name)=>{
            /* Steps
                1_ Check if all rows have same Number of Columns
                2_ put the Matrix in Matrices
            */
            let image  = `Set_Matrix(Matrix , ${name})`
            let Check1 = this.Check_Questions.Is_This_Matrix(Matrix)
            if(!Check1){this.Set_Error(image , "Not Matrix") ; return}
            this.Matrices[name] = {Data : Matrix , info : this.Helper.Get_Matrix_info(Matrix)}
        }
    // Get Functions
        Get_Error = () =>{
            console.log('/// Errors')
            this.Errors.forEach(item => {console.log("  "+item)})
        }
        Get_All_Matrix = ()=>
        {
            console.log("/// Data")
            for(const item in this.Matrices){
                console.log(" ",item , " : " ,this.Matrices[item].Data)
            }
            console.log()
        }

}
const Linear_Model = new Linear_Algebra
Linear_Model.Set_Matrix([[1,2,3],[9,8,7],[1,2,3]] , "A")
Linear_Model.Set_Matrix([[1,2,3],[1,2,3],[1,2,3]] , "B")
Linear_Model.Set_Matrix([[1,5,3],[1,9,3],[1,2,3]] , "F")
Linear_Model.Set_Matrix([[9,8,4],[1,2,3],[1,2,3]] , "p")
Linear_Model.Add("z" , "A" , "B"  , "p"  , "F")
Linear_Model.Sub("c" , "A" , "B"  , "p"  , "F")
Linear_Model.Get_All_Matrix()
Linear_Model.Get_Error()
