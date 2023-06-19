import * as React from 'react';
import { IContentQueryProps } from './IContentQueryProps';
export default class ContentQuery extends React.Component<IContentQueryProps, {
    ListData: Array<string>;
    columnArr: Array<string>;
    titleOfList: string;
}> {
    realListData: any;
    createQuery(): any;
    componentDidMount(): Promise<void>;
    generateColumns(): any;
    constructor(props: any);
    render(): React.ReactElement<IContentQueryProps>;
}
//# sourceMappingURL=ContentQuery.d.ts.map