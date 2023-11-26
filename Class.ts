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
        Is_Those_Valid_To_Matrix_Mulit:(Matrix1, Matrix2)=> {
            if(this.Helper.Get_Matrix_info(Matrix1).Columns == this.Helper.Get_Matrix_info(Matrix2).Rows){return true}
            return false
        },
        Is_This_Square_Matrix:(Matrix) =>{
            let info  = this.Helper.Get_Matrix_info(Matrix)
            if(info.Columns == info.Rows){return true}
            return false
        },
        Is_This_Upper_Trianglular_Matrix:(Matrix) =>{
            if(!this.Check_Questions.Is_This_Square_Matrix(Matrix)){return false}
            for(let i = 0 ; i < this.Helper.Get_Matrix_info(Matrix).Rows ; i++){
                for(let j = 0 ; j < i ; j++){
                    if(Matrix[i][j] != 0){ return false}
                }
            }
            return true
        },
        Is_This_Lower_Trianglular_Matrix:(Matrix) =>{
            let info = this.Helper.Get_Matrix_info(Matrix)
            if(!this.Check_Questions.Is_This_Square_Matrix(Matrix)){return false}
            for(let i = 0 ; i < info.Rows ; i++){
                for(let j = i+1 ; j < info.Columns ; j++){
                    if(Matrix[i][j] != 0){ return false}
                }
            }
            return true
        },
        Is_This_Diagnoal_Matrix : (Matrix) => {
            let info = this.Helper.Get_Matrix_info(Matrix)
            if(!this.Check_Questions.Is_This_Square_Matrix(Matrix)){return false}
            for(let i =0 ; i < info.Rows ; i++){
                for(let j = 0 ; j < info.Columns;j++){
                    if(i == j){continue}
                    if(Matrix[i][j] != 0){return false}
                }
            }
            return true
        },
        Is_This_Identity_Matrix:(Matrix)=> {
            let info = this.Helper.Get_Matrix_info(Matrix)
            if(!this.Check_Questions.Is_This_Square_Matrix(Matrix)){return false}
            for(let i =0 ; i < info.Rows ; i++){
                for(let j = 0 ; j < info.Columns;j++){
                    if(i == j && Matrix[i][j] == 1){continue}
                    if(Matrix[i][j] == 0 && i != j){continue}
                    return false
                }
            }
            return true
        },
        Is_This_Zero_Matrix : (Matrix) =>{
            let info = this.Helper.Get_Matrix_info(Matrix)
            for(let i = 0 ; i < info.Rows;i++){
                for(let j = 0 ; j < info.Columns ; j++){
                    if(Matrix[i][j] != 0 ){return false}
                }
            }
            return true
        },
        Is_This_Symmetric_Matrix:(Matrix) =>{
            // A == Transpose A
            if(!this.Check_Questions.Is_This_Square_Matrix(Matrix)){return false}
            let value = this.Matrices_Operations.Add_Sub("-" , Matrix , this.Matrices_Operations.Transpose(Matrix))
            let Check1= this.Check_Questions.Is_This_Zero_Matrix(value)
            if(!Check1){return false}
            return true
        },
        Is_This_Anti_Symmertric_Matrix:(Matrix)=> {
            // A == - Transpose A
            if(!this.Check_Questions.Is_This_Square_Matrix(Matrix)){return false}
            let value = this.Matrices_Operations.Add_Sub("+" , Matrix , this.Matrices_Operations.Transpose(Matrix))
            let Check1= this.Check_Questions.Is_This_Zero_Matrix(value)
            if(!Check1){return false}
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
        scalar_multiplication:(number, Matrix) =>{
            function calc(col , number){
                if(number >= 1){return number * col}
                return +(number * col).toFixed(4)
            }
            return  Matrix.map(item => item.map(col => calc(col , number)))
        },
        Matrix_Multiplication:(Matrix1, Matrix2) => {
            let arr : Ts.Matrix= []
            for(let i = 0  ; i< this.Helper.Get_Matrix_info(Matrix1).Rows ; i++){
                arr.push([])
                for(let j = 0 ; j < this.Helper.Get_Matrix_info(Matrix2).Columns ; j++){
                    let value = 0
                    for(let k = 0 ; k < this.Helper.Get_Matrix_info(Matrix1).Columns ; k++){
                        value += Matrix1[i][k]*Matrix2[k][j]
                    }
                    arr[i].push(value)
                }
            }
            return arr
        },
        Matrix_Power:(Matrix, Power) =>{
            let info = this.Helper.Get_Matrix_info(Matrix)
            if(Power == 0){return this.Matrices_Kinds.Identity_Matrix(info.Rows , info.Columns)}
            if(Power == 1){return Matrix}
            let Multi = (NewMatrix , currentPower) => {
                if(currentPower == Power){return NewMatrix}
                let value = this.Matrices_Operations.Matrix_Multiplication(NewMatrix , Matrix)
                return Multi(value , currentPower + 1)
            }
            return Multi(Matrix , 1)
        },
        Transpose : (Matrix)=>{
            let arr :Ts.Matrix= []
            let info = this.Helper.Get_Matrix_info(Matrix)
            for(let i =0  ; i <info.Columns ; i++){
                arr.push([])
                for(let j = 0 ; j < info.Rows ; j++){
                    arr[i].push(Matrix[j][i])
                }
            }
            return arr
        }
    }
    private Matrices_Kinds : Ts.Matrices_Kinds = {
        Identity_Matrix(Rows, Columns) {
            let arr :Ts.Matrix= []
            for(let i =0 ; i < Rows ; i++){
                arr.push([])
                for(let j = 0 ; j < Columns ; j++){
                    if(i == j ){arr[i].push(1)}
                    else{arr[i].push(0)}
                }
            }
            return arr
        },
        Zero_Matrix(Rows, Columns) {
            let arr :Ts.Matrix = []
            for(let i =0 ; i < Rows ; i++){
                arr.push([])
                for(let j = 0 ; j < Columns ; j++){
                    arr[i].push(0)
                }
            }
            return arr
        },
    }
    private Elementry_Matrices_operations : Ts.Elementary_Matrices = {
        Switch_Two_Rows(Matrix, R1, R2) {
            R1 -=1 ; R2 -=1
            let hold = Matrix[R1]
            Matrix[R1] = Matrix[R2]
            Matrix[R2] = hold
            return Matrix
        },
        Adding_Multiple_Of_Two_Rows(Matrix, R_From, Number, R_To) {
            R_From -= 1 ; R_To -= 1
            for(let i=0 ; i < Number ; i++){
                for(let j =0 ; j < Matrix[R_From].length ; j++){
                    Matrix[R_To][j] += Matrix[R_From][j]
                }
            }
            return Matrix
        },
        Multiplying_Row_By_Scalar(Matrix, R, number) {
            R -= 1
            Matrix[R] = Matrix[R].map(item => item * number)
            return Matrix
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
        scalar_Multiplication : Ts.scalar_Multiplication = (output_name , number ,name)=>{
            let image  = `scalar_Multiplication(${output_name} , ${number} , ${name})`
            let Check1 = this.Check_Questions.Is_Those_Matrices_exists(name)
            if(!Check1){this.Set_Error(image , "Not Exist");return}
            let matrix = this.Matrices[name].Data
            matrix     = this.Matrices_Operations.scalar_multiplication(number , matrix)
            this.Set_Matrix(matrix , output_name)
        }
        Matrix_Multiplication :Ts.Matrix_Multiplication  = (output_name , ...Matrix) => {
            let image  = `Matrix_Multiplication(${output_name} , ${Matrix})` 
            let Check1 = Matrix.length == 2 
            if(!Check1){this.Set_Error(image ,"More than two Matrix To use Matrix Multiplication");return;}
            let Check2 = this.Check_Questions.Is_Those_Matrices_exists(...Matrix)
            if(!Check2){this.Set_Error(image , "Not Exist");return;}
            let matrixs = this.Helper.Get_Matrices_by_Thier_name(...Matrix)
            let Check3  = this.Check_Questions.Is_Those_Valid_To_Matrix_Mulit(matrixs[0] , matrixs[1])
            if(!Check3){this.Set_Error(image , "Not Valid Matrix Multi");return}
            let value   =this.Matrices_Operations.Matrix_Multiplication(matrixs[0] , matrixs[1])
            this.Set_Matrix(value , output_name)
        }
        Matrix_Power : Ts.Matrix_Power = (output_name , power , name)=>{
            let image  = `Matrix_Power(${output_name} , ${power} , ${name})`
            let Check1 = this.Check_Questions.Is_Those_Matrices_exists(name)
            if(!Check1){this.Set_Error(image , "Not Exist");return}
            let matrix  = this.Helper.Get_Matrices_by_Thier_name(name)[0]
            let Check2 = this.Check_Questions.Is_This_Square_Matrix(matrix)
            if(!Check2){this.Set_Error(image , "Not Square Matrix");return}
            let Check3 = power >= 0 && (power*10)%10 == 0
            if(!Check3){this.Set_Error(image , "Power is not positive and Correct");return}
            let value = this.Matrices_Operations.Matrix_Power(matrix , power)
            this.Set_Matrix(value , output_name)
        }
        TransePose :Ts.Transpose =(output_name , name)=>{
            let image  = `TransePose(${output_name} , ${name})`
            let Check1 = this.Check_Questions.Is_Those_Matrices_exists(name)
            if(!Check1){this.Set_Error(image , "Not Exist")}
            let matrix = this.Helper.Get_Matrices_by_Thier_name(name)[0]
            let value  = this.Matrices_Operations.Transpose(matrix)
            this.Set_Matrix(value , output_name)
        }
    // Set Functions
        private Set_Error : Ts.Set_Error = (Image , Error_name)=>{
            let text = ""
            let error_in = `Error in ${Image}`
            let Error_array : {[key in Ts.Error_name] : string}= {
                "Not Matrix" : `This Input Matrix is not a Matrix , ${error_in} , Columns Number in Every row Must be the same` ,
                "Not Exist"  : `one of those Matrix not exist , ${error_in} , Use Set_Matrix to insert it`,
                "Not Same Size" : `All those Matrix not in same size , ${error_in} , must be Same size`,
                "More than two Matrix To use Matrix Multiplication":`you must add only two matrix , ${error_in} ` ,
                "Not Valid Matrix Multi" : `Not valid to do Matrix Multiplication , ${error_in} , Remember : Columns Number of the first matrix must equal Rows Number of the secound one `,
                "Not Square Matrix"      : `it Must Be Square Matrix , ${error_in} , Remember : Sqaure Matrix is Number of Columns equal Number of Rows `,
                "Power is not positive and Correct" : `power must be bigger thant 0 and not decimal , ${error_in}`
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
            function word(word){
                const length = 25
                if(word.length == length){return word}
                if(word.length < length){word = word + ' '.repeat(length - word.length)}
                return word
            }
            console.log("/// Data")
            for(const item in this.Matrices){
                console.log(" ",word(item) , " : " ,this.Matrices[item].Data)
            }
            console.log()
        }

}
const Linear_Model = new Linear_Algebra
Linear_Model.Set_Matrix([[1,1],[1,1]] , "Matrix1")
Linear_Model.Set_Matrix([[2,2],[1,-1]] , "Matrix2")
Linear_Model.Set_Matrix([[2,1],[1,1]] , "Matrix3")
Linear_Model.Add("Add" , "Matrix1" , "Matrix2"  , "Matrix3")
Linear_Model.Sub("Sub" , "Matrix1" , "Matrix2"  , "Matrix3")
Linear_Model.scalar_Multiplication("Matrix1 * 1/2" , 1/2 , "Matrix1")
Linear_Model.Matrix_Multiplication("Matrix1 * Matrix2", "Matrix1" , "Matrix2")
Linear_Model.Matrix_Power("Matrix1 power 10" , 1, "Matrix1")
Linear_Model.TransePose("Transepose Matrix1","Matrix1")
Linear_Model.Get_All_Matrix()
Linear_Model.Get_Error()
