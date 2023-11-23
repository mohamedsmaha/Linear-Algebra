"use strict";
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
        };
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
        // Set Functions
        this.Set_Error = function (Image, Error_name) {
            var text = "";
            var error_in = "Error in ".concat(Image);
            var Error_array = {
                "Not Matrix": "This Input Matrix is not a Matrix , ".concat(error_in, " , Columns Number in Every row Must be the same"),
                "Not Exist": "one of those Matrix not exist , ".concat(error_in, " , Use Set_Matrix to insert it"),
                "Not Same Size": "All those Matrix not in same size , ".concat(error_in, " , must be Same size")
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
            console.log("/// Data");
            for (var item in _this.Matrices) {
                console.log(" ", item, " : ", _this.Matrices[item].Data);
            }
            console.log();
        };
    }
    return Linear_Algebra;
}());
var Linear_Model = new Linear_Algebra;
Linear_Model.Set_Matrix([[1, 2, 3], [9, 8, 7], [1, 2, 3]], "A");
Linear_Model.Set_Matrix([[1, 2, 3], [1, 2, 3], [1, 2, 3]], "B");
Linear_Model.Set_Matrix([[1, 5, 3], [1, 9, 3], [1, 2, 3]], "F");
Linear_Model.Set_Matrix([[9, 8, 4], [1, 2, 3], [1, 2, 3]], "p");
Linear_Model.Add("z", "A", "B", "p", "F");
Linear_Model.Sub("c", "A", "B", "p", "F");
Linear_Model.Get_All_Matrix();
Linear_Model.Get_Error();
