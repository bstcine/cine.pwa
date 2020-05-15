import React from 'react';

const Footer = () => {
    return (
        <footer className="gfooter">
            <div className="gcontainer">
                <div className="copyright">
                    Copyright © 2014 - {new Date().getFullYear()} BSTCINE. All
                    Rights Reserved.{' '}
                    <a href="http://www.beian.miit.gov.cn/">
                        沪ICP备14053596号-1
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
