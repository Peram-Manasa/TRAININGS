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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IColumnReturnProperty, PropertyFieldColumnPicker, PropertyFieldColumnPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldColumnPicker';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ContentQueryWebPartStrings';
import ContentQuery from './components/ContentQuery';
import { getSP } from '../../pnpConfig';
import '@pnp/sp/presets/all';
import '@pnp/common';
var ContentQueryWebPart = /** @class */ (function (_super) {
    __extends(ContentQueryWebPart, _super);
    function ContentQueryWebPart() {
        var _this = _super.call(this) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        _this.siteUrls = [];
        //   private  onPropertyChange(propertyPath: string, oldValue: any, newValue: string): void{ debugger
        //     this.properties.siteId=newValue;
        //     console.log(this.properties.siteId);
        // }
        _this.onSelectedItem = function (propertyPath, oldValue, newValue) {
            console.log(_this.properties.multiColumn);
        };
        return _this;
    }
    //private _isDarkTheme: boolean;
    ContentQueryWebPart.prototype.render = function () {
        var element = React.createElement(ContentQuery, {
            context: this.context,
            selectedList: this.properties.list,
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName,
            title: this.getListTitle(this.properties.list),
            onSelectedItem: this.onSelectedItem.bind(this),
            listNames: this.properties.multiColumn,
        });
        ReactDom.render(element, this.domElement);
    };
    ContentQueryWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.onInit.call(this)];
            });
        });
    };
    ContentQueryWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    ContentQueryWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ContentQueryWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ContentQueryWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                // PropertyFieldSitePicker('sites', {
                                //   label: 'Select sites',
                                //   initialSites: this.properties.sites,
                                //   context: this.context,
                                //   deferredValidationTime: 500,
                                //   multiSelect: false,
                                //   onPropertyChange: this.onPropertyChange.bind(this),
                                //   properties: this.properties,
                                //   key: 'sitesFieldId'
                                // }),
                                PropertyFieldListPicker('lists', {
                                    label: 'Select a list',
                                    selectedList: this.properties.singleListFiltered,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyListChange.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listPickerFieldId',
                                    multiSelect: false
                                }),
                                // Multi column selection returning the 'Title' of the selected columns
                                PropertyFieldColumnPicker('multiColumn', {
                                    label: 'Select columns',
                                    context: this.context,
                                    selectedColumn: this.properties.multiColumn,
                                    listId: this.properties.singleListFiltered,
                                    disabled: false,
                                    orderBy: PropertyFieldColumnPickerOrderBy.Title,
                                    onPropertyChange: this.onSelectedItem.bind(this),
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'multiColumnPickerFieldId',
                                    displayHiddenColumns: true,
                                    columnReturnProperty: IColumnReturnProperty.Title,
                                    multiSelect: true
                                }),
                            ]
                        }
                    ]
                }
            ]
        };
    };
    ContentQueryWebPart.prototype.getListTitle = function (listId) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, listDetails, listInfo, string, regex, match, extractedWord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSP(this.context)];
                    case 1:
                        sp = _a.sent();
                        return [4 /*yield*/, sp.web.lists.getById(listId)];
                    case 2:
                        listDetails = _a.sent();
                        return [4 /*yield*/, listDetails.getParentInfos()];
                    case 3:
                        listInfo = _a.sent();
                        console.log(listInfo.List.RootFolderServerRelativeUrl);
                        string = listInfo.List.RootFolderServerRelativeUrl;
                        regex = /\/Lists\/(.*)/;
                        match = string.match(regex);
                        if (match) {
                            extractedWord = match[1];
                            console.log(extractedWord); // Output: "Birthdays"
                            return [2 /*return*/, extractedWord];
                        }
                        else {
                            console.log("No match found.");
                            return [2 /*return*/, "Error"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentQueryWebPart.prototype.onPropertyListChange = function (propertyPath, oldValue, newValue) {
        this.properties.list = newValue;
        console.log(newValue);
        this.getListTitle(newValue);
        console.log(this.properties.list);
        this.properties.singleListFiltered = newValue;
        // this.properties.title=newValue[0].title
        console.log(this.properties.singleListFiltered);
    };
    return ContentQueryWebPart;
}(BaseClientSideWebPart));
export default ContentQueryWebPart;
//# sourceMappingURL=ContentQueryWebPart.js.map