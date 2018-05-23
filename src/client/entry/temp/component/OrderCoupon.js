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
        let yyyy = today.getFullYear() + 2;
        let expireDate = ' ' + yyyy + ' 年 ' + mm + ' 月 ' + dd + ' 日';

        this.state = {
            showModal: false,
            err: null,
            list: null,
            curIndex: '0',
            expireDate,
        };
    }

    async componentDidMount() {
        console.log('componentDidMount');

        let [err, result] = await fetchData(
            Api.APIURL_Temp_User_Course_Coupon,
            {}
        );

        if (!err && (!result || result.length <= 0)) {
            alert('您无法参加该活动');
            location.href = '/';
            return;
        }

        this.setState({ err, list: result });
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
        let [err] = await fetchData(Api.APIURL_Temp_User_Course_Coupon_Check, {
            type: String(this.state.curIndex),
        });

        if (err) {
            alert('系统异常');
        } else {
            this.handleOpenModal();
        }
    };

    render() {
        const { err, list, curIndex, expireDate } = this.state;

        let content;
        if (err) {
            content = <div>系统异常</div>;
        } else if (list) {
            content = (
                <div className={'panel'}>
                    <h1>善恩视频课程有效期转换</h1>
                    <div className={'hint-a'}>亲爱的用户：</div>
                    <div className={'hint-b'}>
                        您好！从2018年5月25日起，新购买善恩视频课程的有效期统一调整为2年。您账户下的所有已购课程可选择：
                    </div>
                    <div className="radio-beauty-container">
                        <label
                            className={'radio-label'}
                            onClick={() => {
                                this.onChangRadio('0');
                            }}>
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
                                    我同意将本账户下所有已购课程的有效期从“永久有效”调整为“2年有效”，新的有效期为：即日起至
                                    {expireDate}。
                                </div>
                                <div className={'hint-d'}>并获得：</div>
                                {list.map((value, index) => (
                                    <div className={'hint-e'} key={index}>
                                        {value.hint}
                                    </div>
                                ))}
                                <div className={'hint-f'}>
                                    注：此优惠券仅可用于购买善恩视频课程。
                                </div>
                            </div>
                        </label>
                        <label
                            className={'radio-label'}
                            onClick={() => {
                                this.onChangRadio('1');
                            }}>
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
                                我不需要调整本账户下所有课程的有效期。
                            </div>
                        </label>
                    </div>
                    <div
                        className={'btn'}
                        onClick={() => {
                            this.submit();
                        }}>
                        确定
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                <Header isShow={true} style={{}} />
                <div className={'main'}>{content}</div>
                <Modal
                    isOpen={this.state.showModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className={'success-modal'}>
                        <img src={require('../asset/image/ico_success.png')} />
                        <div className={'font-a'}>操作已成功！</div>
                        <div className={'font-b'}>
                            本账户下所有已购课程的有效期已从“永久有效”调整为“2年有效”。
                        </div>
                        <div className={'font-c'}>
                            优惠券已存入您的账号，可下载“善恩英语”APP并登录查看。
                        </div>
                        <div
                            className={'font-d'}
                            onClick={this.handleCloseModal}>
                            返回官网首页
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}
