import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../../assets/images/footer/HomeIcon';
import { OrderIcon } from '../../assets/images/footer/OrderIcon';
import { ProfileIcon } from '../../assets/images/footer/ProfileIcon';
import { TradeIcon } from '../../assets/images/footer/TradeIcon';
import { WalletIcon } from '../../assets/images/footer/WalletIcon';

import Accordion from '../../../components/Accordion';

import fortemIcon from '../../assets/images/fortemIcon.png';

import logoTechno from '../../../assets/images/svg/branco_techno_bandeira_verde.svg';





const handleGetActiveItemClass = (currentRoute: string, targetRoute: string, absolute?: boolean) => {
    return classnames('pg-mobile-footer__item', {
        'pg-mobile-footer__item--active': absolute ? currentRoute === targetRoute : currentRoute.includes(targetRoute),
    });
};

const FooterComponent: React.FC = () => {
    const { pathname } = useLocation();
    const intl = useIntl();



    return (
        



    <div className="mobileFooter bg-fortem1neutral-700" aria-labelledby="footer-heading">

        <Accordion />
        

        <div className="footerMobile_powered">
						<div className="footer__info">
							<p className="footer__info__title">POWERED BY:</p>
				
							{/* <img src={logoTechno} onClick={}  /> */}
                            <img src={logoTechno}   />
						
						</div>
		</div>

        <div className="footerMobile_copyright">
            {/* <div className="flex flex-row flex-wrap items-center"> */}
                    {/* <img src={fortemIcon} style={{width: '14px'}}/> */}
                    <p>Fortem Digital Assets SA | | CNPJ: 50.093.874/0001-09</p>
            {/* </div>       */}
        </div>

        {/* <div>
				<div className="fortem-line"></div>

				<p className="footerMobile__copyright">
					<img src={fortemIcon} style={{width: '13px'}}/>Fortem One SA © 2023 Copyright : <a href="https://www.fortem1.com.br"> fortem1.com.br </a> | | Fortem Technologies Inc © 2018 - 2022 Copyright : <a href="https://www.fortem-one.tech/"> fortem-one.tech </a> 
				</p>
		</div> */}
    </div>

    );
    
};

export const FooterWebMobile = React.memo(FooterComponent);
