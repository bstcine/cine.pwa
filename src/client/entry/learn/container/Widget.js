import React, { PureComponent } from 'react';
import { CButton as Button } from '@/component/_base';
import GPanel from '@/component/GPanel';
import GIcon from '@/component/GIcon';
import '../asset/style/widget.less';
export default class Widget extends PureComponent {
    render() {
        return (
            <GPanel>
                <div>
                    <Button>
                        <GIcon name="mi-home" /> DEFAULT
                    </Button>
                    <Button color="primary">PRIMARY</Button>
                    <Button color="secondary">SECONDARY</Button>
                    <Button disabled>DISABLED</Button>
                    <Button href="//baidu.com">Link</Button>
                </div>
                <div>
                    <Button variant="outlined">
                        DEFAULT <GIcon name="mi-lock" />
                    </Button>
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
                        SECONDARY <GIcon name="mi-lock" />
                    </Button>
                    <Button disabled variant="contained">
                        DISABLED
                    </Button>
                    <Button variant="contained" href="//baidu.com">
                        Link
                    </Button>
                </div>
                <div>
                    <Button size="small" color="primary">
                        SMALL
                    </Button>
                    <Button size="small" variant="outlined" color="primary">
                        SMALL
                    </Button>
                    <Button size="small" variant="contained" color="primary">
                        SMALL
                    </Button>
                </div>
                <div>
                    <Button size="large" color="secondary">
                        LARGE
                    </Button>
                    <Button size="large" variant="outlined" color="secondary">
                        LARGE <GIcon name="mi-play_circle_filled" />
                    </Button>
                    <Button size="large" variant="contained" color="secondary">
                        LARGE
                    </Button>
                </div>
                <div>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        color="primary">
                        SMALL
                    </Button>
                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="secondary">
                        LARGE
                    </Button>
                </div>
            </GPanel>
        );
    }
}
