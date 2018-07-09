import React, { PureComponent } from 'react';
import { CButton as Button } from '@/component/_base';
import GPanel from '@/component/GPanel';
import '../asset/style/widget.less';
export default class Widget extends PureComponent {
    render() {
        return (
            <GPanel>
                <div>
                    <Button>DEFAULT</Button>
                    <Button color="primary">PRIMARY</Button>
                    <Button color="secondary">SECONDARY</Button>
                    <Button disabled>DISABLED</Button>
                    <Button href="//baidu.com">Link</Button>
                </div>
                <div>
                    <Button variant="outlined">DEFAULT</Button>
                    <Button variant="outlined" color="primary">
                        PRIMARY
                    </Button>
                    <Button variant="outlined" color="secondary">
                        SECONDARY
                    </Button>
                    <Button disabled variant="outlined">
                        DISABLED
                    </Button>
                    <Button variant="outlined" href="//baidu.com">
                        Link
                    </Button>
                </div>
                <div>
                    <Button variant="contained">DEFAULT</Button>
                    <Button variant="contained" color="primary">
                        PRIMARY
                    </Button>
                    <Button variant="contained" color="secondary">
                        SECONDARY
                    </Button>
                    <Button disabled variant="contained">
                        DISABLED
                    </Button>
                    <Button variant="contained" href="//baidu.com">
                        Link
                    </Button>
                </div>
            </GPanel>
        );
    }
}
