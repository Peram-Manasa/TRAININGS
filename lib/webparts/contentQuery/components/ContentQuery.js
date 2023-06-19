/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable no-useless-escape */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { getSP } from '../../../pnpConfig';
import { DetailsList } from 'office-ui-fabric-react';
// import DetailsList from './DetailsList/Components/DetailsList';
// import { DetailsList } from 'office-ui-fabric-react';
var ContentQuery = /** @class */ (function (_super) {
    __extends(ContentQuery, _super);
    // public async getdata():Promise<any>{
    //   const sp:SPFI = getSP(this.props.context)
    //   const caml: ICamlQuery = {
    //     ViewXml: this.createQuery(),
    // };
    //     console.log(caml);
    //   const Reallist = await sp.web.lists.getById(this.props.selectedList)      
    //   const d = await Reallist.getItemsByCAMLQuery(caml);
    //   this.realListData=d
    //    console.log(this.realListData)
    //     return d
    // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ContentQuery(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ListData: [],
            columnArr: [],
            titleOfList: ""
        };
        return _this;
    }
    ContentQuery.prototype.createQuery = function () {
        var query = "<View><ViewFields>";
        this.props.listNames.map(function (x) {
            query += "<FieldRef Name='".concat(x, "' />");
        });
        query += "</ViewFields></View>";
        return query;
    };
    ContentQuery.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var caml, sp, Reallist, d;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        caml = {
                            ViewXml: this.createQuery(),
                        };
                        console.log(caml);
                        sp = getSP(this.props.context);
                        return [4 /*yield*/, sp.web.lists.getById(this.props.selectedList)];
                    case 1:
                        Reallist = _a.sent();
                        return [4 /*yield*/, Reallist.getItemsByCAMLQuery(caml)];
                    case 2:
                        d = _a.sent();
                        this.realListData = d;
                        console.log(this.realListData);
                        console.log(Reallist);
                        this.props.title.then(function (data) {
                            _this.setState({
                                titleOfList: data
                            });
                        });
                        // let arr:any[]=[];
                        //  d.map((y: any) => { Object.keys(y).filter(x => x !== "odata.type" && x !== "odata.id" && x !== "odata.etag" && x !== "odata.editLink" && x !== "FileSystemObjectType" && x !== "ServerRedirectedEmbedUri" && x !== "ServerRedirectedEmbedUrl" && x !== "ContentTypeId" && x !== "ComplianceAssetId" && x !== "OData__ColorTag" && x !== "AuthorId" && x !== "EditorId" && x !== "OData__UIVersionString" && x !== "Attachments" && x !== "GUID" && x !== "Id").map((x: any) => { console.log(x); arr.push(x) }) })
                        this.setState(function () {
                            return __assign(__assign({}, _this.state), { ListData: d });
                        });
                        console.log(this.state.columnArr);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentQuery.prototype.generateColumns = function () {
        var columns = [];
        console.log(this.props.listNames);
        this.props.listNames && this.props.listNames.map(function (x, i) {
            columns.push({ key: "column ".concat(i), name: x, fieldName: x });
        });
        return columns;
    };
    ContentQuery.prototype.render = function () {
        console.log(this.props.selectedList);
        console.log(this.props.title);
        console.log(this.state.ListData);
        console.log(this.generateColumns());
        console.log(this.state.titleOfList);
        var columnsofthedetailslist = this.generateColumns();
        // let actualRealdata = this.getdata();
        // console.log(actualRealdata);
        if (this.state.ListData && columnsofthedetailslist) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("h2", null, this.state.titleOfList)),
                    React.createElement(DetailsList, { columns: this.generateColumns(), items: this.state.ListData }))));
        }
        else {
            return (React.createElement("div", null, "Please select list and Columns"));
        }
    };
    return ContentQuery;
}(React.Component));
export default ContentQuery;
//# sourceMappingURL=ContentQuery.js.map