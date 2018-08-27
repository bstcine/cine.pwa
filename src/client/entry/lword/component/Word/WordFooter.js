/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordFooter extends React.PureComponent {
    render() {
        return (
            <div className="word-Footer">
                <p className="english">
                    It is not because things are difficult that we do not care; it is because we do not dare that they are difficult.
                </p>
                <p className="chinese">
                    并不是因为事情难我们才不敢去做，而是因为我们不敢做事情才难。<br/>
                    —— Seneca
                </p>
            </div>
        );
    }
}

export default WordFooter;