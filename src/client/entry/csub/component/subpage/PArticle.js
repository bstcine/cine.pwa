import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { ArticleList } from '@/component/CardItem';

export default class PArticle extends React.PureComponent {
    render() {
        const { list } = this.props;

        return (
            <CPanel title="精彩文章" className="">
                <CCardContainer layout="112" gap="large" slice={true}>
                    <ArticleList list={list} hover="darken" />
                </CCardContainer>
            </CPanel>
        );
    }
}
