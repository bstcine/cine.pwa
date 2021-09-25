import React, { Component } from 'react';
import Api from '../../../../APIConfig';
import { fetchData } from '@/service/base';
import Modal from 'react-modal';
import Header from '../../../component/Header';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '0',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

Modal.setAppElement('#root');

export default class OrderCoupon extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear() + 5;
        let expireDate = ' ' + yyyy + ' 年 ' + mm + ' 月 ' + dd + ' 日';

        this.state = {
            showModal: false,
            curIndex: '0',
            expireDate,
        };
    }

    async componentDidMount() {
        let [err, result] = await fetchData(
            Api.APIURL_Temp_User_Course_Coupon,
            {}
        );

        if (err === 'no_login') {
            location.reload();
            return;
        } else if (err) {
            alert('系统异常');
            return;
        }

        if (!result || result.length <= 0) {
            alert('您账号下的所有课程不需要调整有效期');
            location.href = '/';
            return;
        }

        this.setState({ list: result });
    }

    onChangRadio = index => {
        this.setState({ curIndex: index });
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
        location.href = '/';
    };

    submit = async () => {
        let type = this.state.curIndex;
        let [err] = await fetchData(Api.APIURL_Temp_User_Course_Coupon_Check, {
            type: type,
        });

        if (err) {
            alert('系统异常');
        } else {
            this.handleOpenModal();
        }
    };

    render() {
        const { showModal, list, curIndex, expireDate } = this.state;

        return (
            <React.Fragment>
                <Header isShow={list} />
                <div className={'main'}>
                    {list && (
                        <div className={'panel'}>
                            <h1>善恩视频使用有效期转换</h1>
                            <div className={'hint-a'}>亲爱的用户：</div>
                            <p className={'hint-b'}>
                                您好！您账户下所有2018年5月28日前购买的视频课程可选择做有效期调整变更，并获赠额外优惠券，具体信息如下：
                            </p>
                            <div className="radio-beauty-container">
                                <label
                                    className={'radio-label'}
                                    onClick={() => {
                                        this.onChangRadio('0');
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="radioName"
                                        id="radioName1"
                                        onChange={() => {
                                            this.onChangRadio('1');
                                        }}
                                        checked={curIndex === '0'}
                                        hidden
                                    />
                                    <label
                                        htmlFor="radioName1"
                                        className="radio-beauty"
                                        style={{ marginTop: '10px' }}
                                    />
                                    <div className="radio-content">
                                        <div className={'hint-c'}>
                                            我同意将本账户下所有
                                            <a className={'hint-key'}>
                                                2018年5月28日
                                            </a>
                                            前购买视频课程的有效期
                                            从“永久有效”调整为“
                                            <a className={'hint-key'}>
                                                5年有效
                                            </a>
                                            ”， 调整后有效期为：即日起至
                                            <a className={'hint-key'}>
                                                {expireDate}
                                            </a>
                                            。
                                        </div>
                                        <div className={'hint-d'}>并获得：</div>
                                        {list.map((value, index) => (
                                            <div
                                                className={'hint-e'}
                                                key={index}
                                            >
                                                {value.hint}
                                            </div>
                                        ))}
                                    </div>
                                </label>
                                <label
                                    className={'radio-label'}
                                    onClick={() => {
                                        this.onChangRadio('1');
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="radioName"
                                        id="radioName2"
                                        onChange={() => {
                                            this.onChangRadio('1');
                                        }}
                                        checked={curIndex === '1'}
                                        hidden
                                    />
                                    <label
                                        htmlFor="radioName2"
                                        className="radio-beauty"
                                    />
                                    <div className="radio-content hint-g">
                                        我暂不调整本账户下所有使用有效期，如需调整我会在
                                        <a className={'hint-key'}>
                                            2018年7月31日
                                        </a>
                                        前完成。
                                    </div>
                                </label>

                                <p className="hint-mark">
                                    注：1.
                                    可转换课程包括2018年5月28日前购买的所有课程；
                                    <br />
                                    2. 使用有效期转换截止日期：2018年7月31日；
                                    <br />
                                    3. 转换后使用有效期为：5年；
                                    <br />
                                    4.
                                    转换后获赠的优惠券仅可用于购买善恩视频课程；
                                    <br />
                                    5.
                                    使用有效期转换一旦完成，不可逆转，请谨慎选择；
                                    <br />
                                    6.
                                    转换过程中如遇任何问题请联系善恩小助手（微信号：BSTCINE02）。
                                </p>
                            </div>

                            <div
                                className={'btn'}
                                onClick={() => {
                                    this.submit();
                                }}
                            >
                                确定
                            </div>
                        </div>
                    )}
                </div>
                <Modal
                    isOpen={showModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className={'success-modal'}>
                        <img src={require('../asset/image/ico_success.png')} />
                        <div className={'font-a'}>操作已成功！</div>

                        <div className={`font-b ${curIndex !== '0' && 'none'}`}>
                            本账户下<a className={'hint-key'}>2018年5月28日</a>
                            前购买视频课程的有效期从“永久有效”调整为“
                            <a className={'hint-key'}>5年有效</a>”。
                        </div>

                        <div className={`font-b ${curIndex !== '1' && 'none'}`}>
                            如需调整使用有效期至：
                            <a className={'hint-key'}>5年</a>，请于
                            <a className={'hint-key'}>2018年7月31日</a>
                            前完成转换；
                            <a className={'hint-key'}>
                                逾期未转换者将默认使用有效期为“永久有效”
                            </a>
                            。
                        </div>
                        <div className={`font-c ${curIndex !== '0' && 'none'}`}>
                            优惠券已存入您的账号，可下载“善恩英语”APP并登录查看。
                        </div>
                        <div
                            className={`btn ${curIndex !== '0' && 'none'}`}
                            onClick={this.handleCloseModal}
                        >
                            返回官网首页
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}
