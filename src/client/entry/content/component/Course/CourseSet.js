import React from 'react';

const CourseSet = ({value, onLink}) => {
    let {setName, setID, setOriginalPrice, setPromotePrice} = value;
    //alert(JSON.stringify(setID))
    return (

        <div className="course-feature">
            <h2>配套套餐</h2>
            <p><a  href="javascript:void(0)" onClick={onLink.bind(this, setID)}>{setName}</a>，
                售价：{setPromotePrice}元，原价：{setOriginalPrice}元</p>
            <p>如果已购买过套餐中的任一单品课程，亦可以直接补差价升级套餐。</p>
        </div>
    )
}

export default CourseSet