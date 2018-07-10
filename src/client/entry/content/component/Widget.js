import React, { PureComponent } from 'react';
import { CButton as Button } from '@/component/_base';
import GPanel from '@/component/GPanel';
import GIcon from '@/component/GIcon';
import '../asset/style/widget.less';
import { CGrid, CCard } from '@/component/_base/Card';
export default class Widget extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <GPanel title="Button @seeat : entry/content/component/Widget.js">
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
                        <Button
                            size="small"
                            variant="contained"
                            color="primary">
                            SMALL
                        </Button>
                    </div>
                    <div>
                        <Button size="large" color="secondary">
                            LARGE
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            color="secondary">
                            LARGE <GIcon name="mi-play_circle_filled" />
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="secondary">
                            LARGE
                        </Button>
                    </div>
                    <div>
                        <Button variant="fab">
                            <GIcon name="mi-lock" />
                        </Button>
                        <Button variant="fab" color="primary">
                            <GIcon name="mi-alarm" />
                        </Button>
                        <Button mini variant="fab" color="secondary">
                            <GIcon name="mi-pets" />
                        </Button>
                    </div>
                    <div>
                        <Button fullWidth variant="contained" color="primary">
                            FULLWIDTH NORMAL
                        </Button>
                        <Button
                            fullWidth
                            size="large"
                            variant="outlined"
                            color="secondary">
                            FULLWIDTH LARGE
                        </Button>
                    </div>
                </GPanel>
                <GPanel title="Gird Card default112">
                    <CGrid>
                        <CCard className="cbabsdf">1</CCard>
                        <CCard>2</CCard>
                        <CCard>3</CCard>
                        <CCard>4</CCard>
                        <CCard>5</CCard>
                        <CCard>6</CCard>
                    </CGrid>
                </GPanel>

                <GPanel title="Gird Card 122">
                    <CGrid>
                        <CCard layout="122">1</CCard>
                        <CCard layout="122">2</CCard>
                        <CCard layout="122">3</CCard>
                        <CCard layout="122">4</CCard>
                        <CCard layout="122">5</CCard>
                        <CCard layout="122">6</CCard>
                    </CGrid>
                </GPanel>

                <GPanel title="Gird Card 123">
                    <CGrid>
                        <CCard layout="123">1</CCard>
                        <CCard layout="123">2</CCard>
                        <CCard layout="123">3</CCard>
                        <CCard layout="123">4</CCard>
                        <CCard layout="123">5</CCard>
                        <CCard layout="123">6</CCard>
                    </CGrid>
                </GPanel>
            </React.Fragment>
        );
    }
}
