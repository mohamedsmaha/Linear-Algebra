"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Linear_Algebra = /** @class */ (function () {
    function Linear_Algebra() {
        var _this = this;
        this.Matrices = {};
        this.Errors = [];
        this.Index_System = "From_Zero";
        // Functions trade indices with each other based on From_Zero System.
        // The user interface function supports two index systems.
        this.Helper = {
            Get_Matrix_info: function (Matrix) {
                var Rows = Matrix.length;
                var Columns = Matrix[0].length;
                return { Rows: Rows, Columns: Columns };
            },
            Get_Matrices_by_Thier_name: function () {
                var Matrices_Names = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    Matrices_Names[_i] = arguments[_i];
                }
                var arr = Matrices_Names.map(function (item) { return _this.Matrices[item].Data; });
                return arr;
            },
            Find_pivot: function (Matrix, location, info, start) {
                if (info.Rows <= location.R) {
                    location.C += 1;
                    location.R = start.R;
                }
                if (info.Columns <= location.C) {
                    return false;
                }
                if (Matrix[location.R][location.C] != 0) {
                    return { "R": location.R, "C": location.C };
                }
                else {
                    location.R += 1;
                }
                return _this.Helper.Find_pivot(Matrix, location, info, start);
            }
        };
        this.Check_Questions = {
            Is_This_Matrix: function () {
                var Matrix = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    Matrix[_i] = arguments[_i];
                }
                function Check_For_Matrix(Matrix, Number, index) {
                    if (index >= Matrix.length) {
                        return true;
                    }
                    if (Matrix[index].length != Number) {
                        return false;
                    }
                    return Check_For_Matrix(Matrix, Number, index + 1);
                }
                function Check_For_array_of_Matrix(index) {
                    if (index >= Matrix.length) {
                        return true;
                    }
                    if (Matrix[index].length == 0) {
                        return false;
                    }
                    if (!Check_For_Matrix(Matrix[index], Matrix[index][0].length, 1)) {
                        return false;
                    }
                    return Check_For_array_of_Matrix(index + 1);
                }
                if (Matrix.length <= 0) {
                    return false;
                }
                return Check_For_array_of_Matrix(0);
            },
            Is_Those_Same_Size: function () {
                var Matrix = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    Matrix[_i] = arguments[_i];
                }
                function Compare(info1, info2) {
                    if (info1.Rows == info2.Rows && info1.Columns == info2.Columns) {
                        return true;
                    }
                    return false;
                }
                var Check = function (info, index) {
                    if (index >= Matrix.length) {
                        return true;
                    }
                    if (!Compare(info, _this.Helper.Get_Matrix_info(Matrix[index]))) {
                        return false;
                    }
                    return Check(info, index + 1);
                };
                if (Matrix.length == 0) {
                    return false;
                }
                return Check(_this.Helper.Get_Matrix_info(Matrix[0]), 1);
            },
            Is_Those_Matrices_exists: function () {
                var name = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    name[_i] = arguments[_i];
                }
                var arr = name.filter(function (item) { return _this.Matrices[item] == undefined; });
                if (arr.length != 0) {
                    return false;
                }
                return true;
            },
            Is_Those_Valid_To_Matrix_Mulit: function (Matrix1, Matrix2) {
                if (_this.Helper.Get_Matrix_info(Matrix1).Columns == _this.Helper.Get_Matrix_info(Matrix2).Rows) {
                    return true;
                }
                return false;
            },
            Is_This_Square_Matrix: function (Matrix) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                if (info.Columns == info.Rows) {
                    return true;
                }
                return false;
            },
            Is_This_Upper_Trianglular_Matrix: function (Matrix) {
                if (!_this.Check_Questions.Is_This_Square_Matrix(Matrix)) {
                    return false;
                }
                for (var i = 0; i < _this.Helper.Get_Matrix_info(Matrix).Rows; i++) {
                    for (var j = 0; j < i; j++) {
                        if (Matrix[i][j] != 0) {
                            return false;
                        }
                    }
                }
                return true;
            },
            Is_This_Lower_Trianglular_Matrix: function (Matrix) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                if (!_this.Check_Questions.Is_This_Square_Matrix(Matrix)) {
                    return false;
                }
                for (var i = 0; i < info.Rows; i++) {
                    for (var j = i + 1; j < info.Columns; j++) {
                        if (Matrix[i][j] != 0) {
                            return false;
                        }
                    }
                }
                return true;
            },
            Is_This_Diagnoal_Matrix: function (Matrix) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                if (!_this.Check_Questions.Is_This_Square_Matrix(Matrix)) {
                    return false;
                }
                for (var i = 0; i < info.Rows; i++) {
                    for (var j = 0; j < info.Columns; j++) {
                        if (i == j) {
                            continue;
                        }
                        if (Matrix[i][j] != 0) {
                            return false;
                        }
                    }
                }
                return true;
            },
            Is_This_Identity_Matrix: function (Matrix) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                if (!_this.Check_Questions.Is_This_Square_Matrix(Matrix)) {
                    return false;
                }
                for (var i = 0; i < info.Rows; i++) {
                    for (var j = 0; j < info.Columns; j++) {
                        if (i == j && Matrix[i][j] == 1) {
                            continue;
                        }
                        if (Matrix[i][j] == 0 && i != j) {
                            continue;
                        }
                        return false;
                    }
                }
                return true;
            },
            Is_This_Zero_Matrix: function (Matrix) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                for (var i = 0; i < info.Rows; i++) {
                    for (var j = 0; j < info.Columns; j++) {
                        if (Matrix[i][j] != 0) {
                            return false;
                        }
                    }
                }
                return true;
            },
            Is_This_Symmetric_Matrix: function (Matrix) {
                // A == Transpose A
                if (!_this.Check_Questions.Is_This_Square_Matrix(Matrix)) {
                    return false;
                }
                var value = _this.Matrices_Operations.Add_Sub("-", Matrix, _this.Matrices_Operations.Transpose(Matrix));
                var Check1 = _this.Check_Questions.Is_This_Zero_Matrix(value);
                if (!Check1) {
                    return false;
                }
                return true;
            },
            Is_This_Anti_Symmertric_Matrix: function (Matrix) {
                // A == - Transpose A
                if (!_this.Check_Questions.Is_This_Square_Matrix(Matrix)) {
                    return false;
                }
                var value = _this.Matrices_Operations.Add_Sub("+", Matrix, _this.Matrices_Operations.Transpose(Matrix));
                var Check1 = _this.Check_Questions.Is_This_Zero_Matrix(value);
                if (!Check1) {
                    return false;
                }
                return true;
            },
        };
        this.Matrices_Operations = {
            Add_Sub: function (Operation) {
                var Matrix = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    Matrix[_i - 1] = arguments[_i];
                }
                function Sum_Two_Rows(row1, row2, Coff) {
                    return row1.map(function (item, index) { return item + Coff * row2[index]; });
                }
                var coff = (Operation == "+") ? 1 : -1;
                var arr = Matrix[0];
                var _loop_1 = function (i) {
                    arr = arr.map(function (item, index) { return Sum_Two_Rows(item, Matrix[i][index], coff); });
                };
                for (var i = 1; i < Matrix.length; i++) {
                    _loop_1(i);
                }
                return arr;
            },
            scalar_multiplication: function (number, Matrix) {
                function calc(col, number) {
                    if (number >= 1) {
                        return number * col;
                    }
                    return +(number * col).toFixed(4);
                }
                return Matrix.map(function (item) { return item.map(function (col) { return calc(col, number); }); });
            },
            Matrix_Multiplication: function (Matrix1, Matrix2) {
                var arr = [];
                for (var i = 0; i < _this.Helper.Get_Matrix_info(Matrix1).Rows; i++) {
                    arr.push([]);
                    for (var j = 0; j < _this.Helper.Get_Matrix_info(Matrix2).Columns; j++) {
                        var value = 0;
                        for (var k = 0; k < _this.Helper.Get_Matrix_info(Matrix1).Columns; k++) {
                            value += Matrix1[i][k] * Matrix2[k][j];
                        }
                        arr[i].push(value);
                    }
                }
                return arr;
            },
            Matrix_Power: function (Matrix, Power) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                if (Power == 0) {
                    return _this.Matrices_Kinds.Identity_Matrix(info.Rows, info.Columns);
                }
                if (Power == 1) {
                    return Matrix;
                }
                var Multi = function (NewMatrix, currentPower) {
                    if (currentPower == Power) {
                        return NewMatrix;
                    }
                    var value = _this.Matrices_Operations.Matrix_Multiplication(NewMatrix, Matrix);
                    return Multi(value, currentPower + 1);
                };
                return Multi(Matrix, 1);
            },
            Transpose: function (Matrix) {
                var arr = [];
                var info = _this.Helper.Get_Matrix_info(Matrix);
                for (var i = 0; i < info.Columns; i++) {
                    arr.push([]);
                    for (var j = 0; j < info.Rows; j++) {
                        arr[i].push(Matrix[j][i]);
                    }
                }
                return arr;
            }
        };
        this.Matrices_Kinds = {
            Identity_Matrix: function (Rows, Columns) {
                var arr = [];
                for (var i = 0; i < Rows; i++) {
                    arr.push([]);
                    for (var j = 0; j < Columns; j++) {
                        if (i == j) {
                            arr[i].push(1);
                        }
                        else {
                            arr[i].push(0);
                        }
                    }
                }
                return arr;
            },
            Zero_Matrix: function (Rows, Columns) {
                var arr = [];
                for (var i = 0; i < Rows; i++) {
                    arr.push([]);
                    for (var j = 0; j < Columns; j++) {
                        arr[i].push(0);
                    }
                }
                return arr;
            },
        };
        this.Elementry_Matrices_operations = {
            Switch_Two_Rows: function (Matrix, R1, R2) {
                var hold = Matrix[R1];
                Matrix[R1] = Matrix[R2];
                Matrix[R2] = hold;
                return Matrix;
            },
            Adding_Multiple_Of_Two_Rows: function (Matrix, R_From, Number, R_To) {
                var Row = _this.Matrices_Operations.scalar_multiplication(Number, [Matrix[R_From]]);
                for (var j = 0; j < Matrix[R_From].length; j++) {
                    Matrix[R_To][j] += Row[0][j];
                }
                return Matrix;
            },
            Multiplying_Row_By_Scalar: function (Matrix, R, number) {
                Matrix[R] = Matrix[R].map(function (item) { return +(item * number).toFixed(3); });
                return Matrix;
            },
            Row_Echelon_Form: function (Matrix) {
                var info = _this.Helper.Get_Matrix_info(Matrix);
                var Next_Pivot = { "R": 0, "C": 0 };
                var Set_pivot = function () {
                    var result = _this.Helper.Find_pivot(Matrix, __assign({}, Next_Pivot), info, __assign({}, Next_Pivot));
                    if (result == false) {
                        return false;
                    }
                    var number = 1 / Matrix[result.R][result.C];
                    Matrix = _this.Elementry_Matrices_operations.Switch_Two_Rows(Matrix, Next_Pivot.R, result.R);
                    Matrix = _this.Elementry_Matrices_operations.Multiplying_Row_By_Scalar(Matrix, Next_Pivot.R, number);
                    return true;
                };
                var reset_under_pivots = function (Row) {
                    if (info.Rows <= Row) {
                        return;
                    }
                    var Number = Matrix[Row][Next_Pivot.C] * -1;
                    Matrix = _this.Elementry_Matrices_operations.Adding_Multiple_Of_Two_Rows(Matrix, Next_Pivot.R, Number, Row);
                    return reset_under_pivots(Row + 1);
                };
                var Find_REF = function () {
                    var found_pivot = Set_pivot();
                    if (!found_pivot) {
                        return Matrix;
                    }
                    reset_under_pivots(Next_Pivot.R + 1);
                    Next_Pivot.R += 1;
                    Next_Pivot.C += 1;
                    return Find_REF();
                };
                return Find_REF();
            }
        };
        // Equations 
        // Matrices_Operations 
        this.Add_Sub = function (output_name, Operation, image) {
            var _a, _b, _c, _d;
            var Matrix = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                Matrix[_i - 3] = arguments[_i];
            }
            var Check1 = (_a = _this.Check_Questions).Is_Those_Matrices_exists.apply(_a, Matrix);
            if (!Check1) {
                _this.Set_Error(image, "Not Exist");
                return;
            }
            var Matrices = (_b = _this.Helper).Get_Matrices_by_Thier_name.apply(_b, Matrix);
            var Check2 = (_c = _this.Check_Questions).Is_Those_Same_Size.apply(_c, Matrices);
            if (!Check2) {
                _this.Set_Error(image, "Not Same Size");
                return;
            }
            var value = (_d = _this.Matrices_Operations).Add_Sub.apply(_d, __spreadArray([Operation], Matrices, false));
            _this.Set_Matrix(value, output_name);
        };
        this.Add = function (output_name) {
            var Matrix = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                Matrix[_i - 1] = arguments[_i];
            }
            var image = "Add(".concat(output_name, " , ").concat(Matrix, ")");
            _this.Add_Sub.apply(_this, __spreadArray([output_name, "+", image], Matrix, false));
        };
        this.Sub = function (output_name) {
            var Matrix = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                Matrix[_i - 1] = arguments[_i];
            }
            var image = "Sub(".concat(output_name, " , ").concat(Matrix, ")");
            _this.Add_Sub.apply(_this, __spreadArray([output_name, "-", image], Matrix, false));
        };
        this.scalar_Multiplication = function (output_name, number, name) {
            var image = "scalar_Multiplication(".concat(output_name, " , ").concat(number, " , ").concat(name, ")");
            var Check1 = _this.Check_Questions.Is_Those_Matrices_exists(name);
            if (!Check1) {
                _this.Set_Error(image, "Not Exist");
                return;
            }
            var matrix = _this.Matrices[name].Data;
            matrix = _this.Matrices_Operations.scalar_multiplication(number, matrix);
            _this.Set_Matrix(matrix, output_name);
        };
        this.Matrix_Multiplication = function (output_name) {
            var _a, _b;
            var Matrix = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                Matrix[_i - 1] = arguments[_i];
            }
            var image = "Matrix_Multiplication(".concat(output_name, " , ").concat(Matrix, ")");
            var Check1 = Matrix.length == 2;
            if (!Check1) {
                _this.Set_Error(image, "More than two Matrix To use Matrix Multiplication");
                return;
            }
            var Check2 = (_a = _this.Check_Questions).Is_Those_Matrices_exists.apply(_a, Matrix);
            if (!Check2) {
                _this.Set_Error(image, "Not Exist");
                return;
            }
            var matrixs = (_b = _this.Helper).Get_Matrices_by_Thier_name.apply(_b, Matrix);
            var Check3 = _this.Check_Questions.Is_Those_Valid_To_Matrix_Mulit(matrixs[0], matrixs[1]);
            if (!Check3) {
                _this.Set_Error(image, "Not Valid Matrix Multi");
                return;
            }
            var value = _this.Matrices_Operations.Matrix_Multiplication(matrixs[0], matrixs[1]);
            _this.Set_Matrix(value, output_name);
        };
        this.Matrix_Power = function (output_name, power, name) {
            var image = "Matrix_Power(".concat(output_name, " , ").concat(power, " , ").concat(name, ")");
            var Check1 = _this.Check_Questions.Is_Those_Matrices_exists(name);
            if (!Check1) {
                _this.Set_Error(image, "Not Exist");
                return;
            }
            var matrix = _this.Helper.Get_Matrices_by_Thier_name(name)[0];
            var Check2 = _this.Check_Questions.Is_This_Square_Matrix(matrix);
            if (!Check2) {
                _this.Set_Error(image, "Not Square Matrix");
                return;
            }
            var Check3 = power >= 0 && (power * 10) % 10 == 0;
            if (!Check3) {
                _this.Set_Error(image, "Power is not positive and Correct");
                return;
            }
            var value = _this.Matrices_Operations.Matrix_Power(matrix, power);
            _this.Set_Matrix(value, output_name);
        };
        this.TransePose = function (output_name, name) {
            var image = "TransePose(".concat(output_name, " , ").concat(name, ")");
            var Check1 = _this.Check_Questions.Is_Those_Matrices_exists(name);
            if (!Check1) {
                _this.Set_Error(image, "Not Exist");
            }
            var matrix = _this.Helper.Get_Matrices_by_Thier_name(name)[0];
            var value = _this.Matrices_Operations.Transpose(matrix);
            _this.Set_Matrix(value, output_name);
        };
        // Set Functions
        this.Set_Error = function (Image, Error_name) {
            var text = "";
            var error_in = "Error in ".concat(Image);
            var Error_array = {
                "Not Matrix": "This Input Matrix is not a Matrix , ".concat(error_in, " , Columns Number in Every row Must be the same"),
                "Not Exist": "one of those Matrix not exist , ".concat(error_in, " , Use Set_Matrix to insert it"),
                "Not Same Size": "All those Matrix not in same size , ".concat(error_in, " , must be Same size"),
                "More than two Matrix To use Matrix Multiplication": "you must add only two matrix , ".concat(error_in, " "),
                "Not Valid Matrix Multi": "Not valid to do Matrix Multiplication , ".concat(error_in, " , Remember : Columns Number of the first matrix must equal Rows Number of the secound one "),
                "Not Square Matrix": "it Must Be Square Matrix , ".concat(error_in, " , Remember : Sqaure Matrix is Number of Columns equal Number of Rows "),
                "Power is not positive and Correct": "power must be bigger thant 0 and not decimal , ".concat(error_in)
            };
            text = Error_array[Error_name];
            _this.Errors.push(text);
        };
        this.Set_Matrix = function (Matrix, name) {
            /* Steps
                1_ Check if all rows have same Number of Columns
                2_ put the Matrix in Matrices
            */
            var image = "Set_Matrix(Matrix , ".concat(name, ")");
            var Check1 = _this.Check_Questions.Is_This_Matrix(Matrix);
            if (!Check1) {
                _this.Set_Error(image, "Not Matrix");
                return;
            }
            _this.Matrices[name] = { Data: Matrix, info: _this.Helper.Get_Matrix_info(Matrix) };
        };
        // Get Functions
        this.Get_Error = function () {
            console.log('/// Errors');
            _this.Errors.forEach(function (item) { console.log("  " + item); });
        };
        this.Get_All_Matrix = function () {
            function word(word) {
                var length = 25;
                if (word.length == length) {
                    return word;
                }
                if (word.length < length) {
                    word = word + ' '.repeat(length - word.length);
                }
                return word;
            }
            console.log("/// Data");
            for (var item in _this.Matrices) {
                console.log(" ", word(item), " : ", _this.Matrices[item].Data);
            }
            console.log();
        };
    }
    return Linear_Algebra;
}());
var Linear_Model = new Linear_Algebra;
Linear_Model.Set_Matrix([[1, 1], [1, 1]], "Matrix1");
Linear_Model.Set_Matrix([[2, 2], [1, -1]], "Matrix2");
Linear_Model.Set_Matrix([[2, 1], [1, 1]], "Matrix3");
Linear_Model.Add("Add", "Matrix1", "Matrix2", "Matrix3");
Linear_Model.Sub("Sub", "Matrix1", "Matrix2", "Matrix3");
Linear_Model.scalar_Multiplication("Matrix1 * 1/2", 1 / 2, "Matrix1");
Linear_Model.Matrix_Multiplication("Matrix1 * Matrix2", "Matrix1", "Matrix2");
Linear_Model.Matrix_Power("Matrix1 power 10", 1, "Matrix1");
Linear_Model.TransePose("Transepose Matrix1", "Matrix1");
Linear_Model.Get_All_Matrix();
Linear_Model.Get_Error();
