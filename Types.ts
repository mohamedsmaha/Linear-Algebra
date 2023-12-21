export type Row    = number[]
export type Matrix = Row[]
export type Matrices = {[key : string] : {Data : Matrix , info : info}}
export type Errors   = string[]
export type info     = {Rows : number , Columns : number} 
export type pivot_location = {R : number , C : number}
// Functions_Variables
    // Check
        export type Check_Questions = {
            Is_This_Matrix      : (...Matrix  :  Matrix[]) => Boolean ,
            Is_Those_Same_Size  : (...matrix  : Matrix[] ) => Boolean,
            Is_Those_Matrices_exists : (...name : string[]) => Boolean,
            Is_Those_Valid_To_Matrix_Mulit : (Matrix1:Matrix , Matrix2:Matrix)=>Boolean,
            Is_This_Square_Matrix : (Matrix : Matrix) => Boolean,
            Is_This_Upper_Trianglular_Matrix : (Matrix : Matrix) => Boolean,
            Is_This_Lower_Trianglular_Matrix : (Matrix : Matrix) => Boolean,
            Is_This_Diagnoal_Matrix          : (Matrix : Matrix) => Boolean,
            Is_This_Identity_Matrix          : (Matrix : Matrix) => Boolean,
            Is_This_Zero_Matrix              : (Matrix : Matrix) => Boolean,
            Is_This_Symmetric_Matrix         : (Matrix : Matrix) => Boolean, 
            Is_This_Anti_Symmertric_Matrix   : (Matrix : Matrix) => Boolean
        }
    // Helper
        export type Helper = {
            Get_Matrix_info: (Matrix : Matrix) => info ,
            Get_Matrices_by_Thier_name : (...Matrices_Names : string[]) => Matrix[],
            Find_pivot                 :
            (Matrix : Matrix , location : pivot_location , info :info , start :pivot_location) => false | pivot_location
        }
    // Elementary Marices
        export type Elementary_Matrices = {
            Switch_Two_Rows             : (Matrix : Matrix   , R1:number , R2     : number) => Matrix   ,
            Multiplying_Row_By_Scalar   : (Matrix : Matrix   , R :number , number : number) => Matrix ,
            Adding_Multiple_Of_Two_Rows : (Matrix : Matrix   , R_From:number , Number , R_To : number)  => Matrix  ,
            Row_Echelon_Form            : (Matrix : Matrix) => Matrix     
        }
    // Matrices Operations
        export type Matrices_Operations = {
            Add_Sub : (Operation : "+" | "-" , ...Matrix:Matrix[] ) => Matrix ,
            scalar_multiplication : (number , Matrix:Matrix) => Matrix
            Matrix_Multiplication : (Matrix1:Matrix , Matrix2:Matrix)=> Matrix,
            Matrix_Power          : (Matrix :Matrix , Power : number)=> Matrix,
            Transpose             : (Matrix :Matrix) => Matrix
        }
    // Matrices Kinds
        export type Matrices_Kinds = {
            Identity_Matrix : (Rows , Columns) => Matrix,
            Zero_Matrix     : (Rows , Columns) => Matrix
        }
// Functions
    // Equations
        export type Row_Echelon_Form = (Matrix : Matrix) => Matrix
    //Set Functions
        export type Set_Matrix = (Matrix: Matrix  , output_name:string)    => void
        export type Set_Error  = (image : string  , Error_name:Error_name) => void
    // Matrices_Operations
        export type Transpose             = (output_name : string, name  : string ) => void
        export type Matrix_Power          = (output_name : string, Power : number , name :string) => void
        export type Matrix_Multiplication = (output_name : string, ...Matrix:string[]) => void
        export type scalar_Multiplication = (output_name :string , number : number , name : string) => void
        export type Add_Or_Sub = (output_name : string , ...Matrix : string[]) => void
        export type Add_Sub    = (output_name : string , Operation : "+" | "-" , Image : string , ...Matrix : string[] ) => void
// Error name
export type Error_name = "Not Matrix" | "Not Exist" | "Not Same Size" | "More than two Matrix To use Matrix Multiplication" | "Not Valid Matrix Multi" | 
                        "Not Square Matrix" | "Power is not positive and Correct"
// Check_Questions 
