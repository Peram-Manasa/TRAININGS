import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IContentQueryProps {
    title: Promise<string>;
    context: WebPartContext;
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    selectedList: string;
    id: any;
    viewFields: string[];
    listNames: any;
}
//# sourceMappingURL=IContentQueryProps.d.ts.map