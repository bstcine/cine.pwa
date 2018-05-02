import React from 'react';
const Points = ({ points, ...props }) => {
    let renderPoints;
    if (points && points.rows && points.rows.length) {
        renderPoints = (
            <React.Fragment>
                <div className={'point-header'}>
                    <div className={'point-value'}>积分</div>
                    <div className={'point-text'}>积分明细</div>
                    <div className={'point-time'}>积分时间</div>
                    <div className={'point-total'}>剩余积分</div>
                </div>
                {points.rows.map(item => {
                    return (
                        <div className={'point-body'} key={item.id}>
                            <div className={'point-text'}>
                                {item.action_text}
                            </div>
                            <div
                                className={
                                    item.value < 0
                                        ? 'point-value use'
                                        : 'point-value'
                                }>
                                {item.value > 0 ? '+' + item.value : item.value}
                            </div>
                            <div className={'point-time'}>{item.create_at}</div>
                            <div className={'point-total'}>
                                {item.current_total_value}
                            </div>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    } else {
        renderPoints = <div className="point-not-found">暂无数据</div>;
    }

    return <div className="point-list">{renderPoints}</div>;
};

export default Points;
