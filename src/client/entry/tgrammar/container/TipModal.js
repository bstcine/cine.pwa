import '@/asset/style/modal.less';
import React from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import {closeTipModal} from '../action';

const mapStateToProps = state => {
    let {tipModal, quiz} = state;
    return {isOpen: tipModal.isOpen, title: quiz.name};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(closeTipModal());
    }
});

const TipModal = ({title, isOpen, onClick}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            className="modal tip-modal"
            overlayClassName="modal-overlay"
            bodyOpenClassName="body-modal-open"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <h2>{title}</h2>
            <p>
                本试题用于测试学生的英语文法基础和阅读能力，故本试题中所涉及的语法都是事关英语句子结构的重点语法。对于一些细节性的语法，例如family做主语算单数还是复数这样的问题，我们不做考察。但对于定语从句里that在什么情况下可以省略、什么情况不可以省略的问题，我们加以考察，因为这个知识点直接关系到学生对句子结构的分析和对复杂句子的理解。
            </p>
            <p>
                这份试题被故意设计用于测试K-12年级的广谱学生，因此可能会有学生觉得一些题目困难，而另一些学生觉得一些题目特别简单，这是很正常的。挑选自己能做的做。在选择题部分，随机的猜测将不会提高学生的成绩，因为做错一题将被倒扣1/3分
            </p>
            <button className="btn btn-blue" onClick={onClick}>
                开始测试
            </button>
        </ReactModal>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TipModal);
