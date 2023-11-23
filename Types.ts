export type Row    = number[]
export type Matrix = Row[]
export type Matrices = {[key : string] : {Data : Matrix , info : info}}
export type Errors   = string[]
export type info     = {Rows : number , Columns : number} 
// Functions_Variables
    // Check
        export type Check_Questions = {
            Is_This_Matrix      : (...Matrix  :  Matrix[]) => Boolean ,
            Is_Those_Same_Size  : (...matrix  : Matrix[] ) => Boolean,
            Is_Those_Matrices_exists : (...name : string[]) => Boolean
        }
    // Helper
        export type Helper = {
            Get_Matrix_info: (Matrix : Matrix) => info ,
            Get_Matrices_by_Thier_name : (...Matrices_Names : string[]) => Matrix[]
        }
    // Matrices Operations
        export type Matrices_Operations = {
            Add_Sub : (Operation : "+" | "-" , ...Matrix:Matrix[] ) => Matrix
        }
// Functions
    //Set Functions
        export type Set_Matrix = (Matrix: Matrix  , output_name:string)    => void
        export type Set_Error  = (image : string  , Error_name:Error_name) => void
    // Matrices_Operations
        export type Add_Or_Sub = (output_name : string , ...Matrix : string[]) => void
        export type Add_Sub    = (output_name : string , Operation : "+" | "-" , Image : string , ...Matrix : string[] ) => void
// Error name
export type Error_name = "Not Matrix" | "Not Exist" | "Not Same Size"
// Check_Questions 
