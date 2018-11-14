const Navigation = ({ value, onChange, children, className }) => {
    return <div />;
};
const NavigationItem = ({ value, label, icon }) => {
    return <div />;
};

export { Navigation, NavigationItem };

const Demo = () => {
    return (
        <Navigation value="" onChange={this.handleChange}>
            <NavigationItem label="核心课程" value="course" />
            <NavigationItem label="录课老师" value="teacher" />
            <NavigationItem label="口碑好评" value="comment" />
            <NavigationItem label="精彩文章" value="article" />
            <NavigationItem label="资料下载" value="resourse" />
        </Navigation>
    );
};
