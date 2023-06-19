import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import { IPropertyFieldList } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IPropertyFieldSite } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';
import '@pnp/sp/presets/all';
import '@pnp/common';
export interface IContentQueryWebPartProps {
    textInfoHeaderValue: string;
    selectedView: any;
    list: string;
    column: string | string[];
    singleListFiltered: string;
    multiColumn: string | string[];
    view: string | string[];
    sites: IPropertyFieldSite[];
    lists: string | string[] | IPropertyFieldList | IPropertyFieldList[];
    description: string;
    selectedList: string;
    siteId: string;
    title: Promise<string>;
}
export interface IDynamicItem {
    webUrl: string;
    listId: string;
    siteId: string;
    itemId: number;
}
export interface IPropertyControlsTestWebPartProps {
    list: string;
}
export interface IPropertyControlsTestWebPartProps {
    list: string;
    column: string;
    multiColumn: string;
    sites: IPropertyFieldSite[];
    lists: string | string[];
}
export default class ContentQueryWebPart extends BaseClientSideWebPart<IContentQueryWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    options: IPropertyPaneDropdownOption[];
    selectedItem: IDynamicItem;
    constructor();
    siteUrls: any;
    render(): void;
    protected onInit(): Promise<void>;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    getListTitle(listId: any): Promise<string>;
    onPropertyListChange(propertyPath: string, oldValue: any, newValue: any): void;
    private onSelectedItem;
}
//# sourceMappingURL=ContentQueryWebPart.d.ts.map