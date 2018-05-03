import React from 'react';

const CourseSet = ({ value }) => {
    let { name, id, original_price, price } = value;
    let originalPrice = original_price ? '，原价：' + original_price + '元' : '';
    let href = '/content/course?cid=' + id;
    return (
        <div className="course-feature">
            <h2>配套套餐</h2>
            <p>
                <a href={href}>
                    {name}
                </a>， 售价：{price}元{originalPrice}
            </p>
            <p>如果已购买过套餐中的任一单品课程，亦可以直接补差价升级套餐。</p>
        </div>
    );
};

export default CourseSet;
