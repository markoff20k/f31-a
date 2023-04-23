import React, { useState } from "react";
import { Parallax } from "react-scroll-parallax";


import { Col, Progress, Row, Statistic } from 'antd';
import { ProgressBar } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

//import * as React from 'react'; 
import Countdown from 'react-countdown';
import { useDispatch, useSelector,  } from 'react-redux';
import { useHistory } from 'react-router';
import ReactCardFlip from 'react-card-flip';

import { currenciesFetch, selectCurrencies } from '../../../../modules';

import { SaleItem } from "src/modules/sale/sale-item";

import { localeDate } from "../../../../helpers/localeDate";
import { Decimal } from "../../../../components";

import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

import { ProgressLinear } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';


import ccVisa from '../../assets/creditCards.png';
import real from './real.svg';
import ether from './ether-logo.png';
import usdc from './usdc.svg';
import usdt from './usdt.svg';



interface SaleItemProps {
	key: string | number | undefined;
	sale: SaleItem;
	type: 'ongoing' | 'upcoming' | 'ended' | 'active';
}

const Separator = () => {
    return (
        <div className="rbt-separator-mid">
            <div className="container">
                <hr className="rbt-separator m-0" />
            </div>
        </div>
    )
}

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// render a completed state
		// window.location.reload(false);
		return (
			<div id="sale_item__timer">
				<div id="days">
					00 <span>Dias</span>
				</div>
				<div id="hours">
					00 <span>Horas</span>
				</div>
				<div id="minutes">
					00 <span>Min</span>
				</div>
				<div id="seconds">
					00 <span>Seg</span>
				</div>
			</div>
		);
	} else {
		// render a countdown
		return (
			<div id="sale_item__timer">
				<div id="days">
					{days} <span>Dias</span>
				</div>
				<div id="hours">
					{hours} <span>Horas</span>
				</div>
				<div id="minutes">
					{minutes} <span>Min</span>
				</div>
				<div id="seconds">
					{seconds} <span>Seg</span>
				</div>
			</div>
		);
	}
};

export const IEOItem: React.FC<SaleItemProps> = (props: SaleItemProps) => {
	const history = useHistory();

	const dispatch = useDispatch();
	const dispatchcFetchCurrencies = React.useCallback(() => dispatch(currenciesFetch()), [dispatch]);

	const [flip, setFlip] = useState(false);


	React.useEffect(() => {
		dispatchcFetchCurrencies();
	}, [dispatchcFetchCurrencies]);
	const currencies = useSelector(selectCurrencies);
	let saleBadgeColor = '#0C9D58ff';
	let saleBadgeDescription = 'Em captação';

	switch (props.type) {
		case 'ongoing':
			saleBadgeColor = '#009991 ';
			saleBadgeDescription = 'Em captação';
			break;
		case 'upcoming':
			saleBadgeColor = '#FABE08ff';
			saleBadgeDescription = 'Captação futura';

			break;
		case 'ended':
			saleBadgeColor = '#EA4235ff';
			saleBadgeDescription = 'Captação finalizada';
			break;
		case 'active':
				saleBadgeColor = '#13b887 ';
				break;			
		default:
			break;
	}


	const [show, setShow] = useState(false);
	

	const countdownTime = props.type === 'upcoming' ? new Date(props.sale.start_date) : new Date(props.sale.end_date);
	let countdownTitle: JSX.Element;

	switch (props.type) {
		case 'upcoming':
			countdownTitle = <span style={{fontSize: '14px', color: '#FABE08ff'}} className="text-center align-items-center justify-items-center">Início da captação: {localeDate(props.sale.start_date, 'fullDate', 'pt-BR')}</span>;
			break;
		case 'ongoing':
			countdownTitle = <span style={{fontSize: '14px'}} className="text-center align-items-center justify-items-center text-danger">Fim da captação: {localeDate(props.sale.end_date, 'fullDate', 'pt-BR')}</span>;
			break;
		default:
			countdownTitle = <span style={{fontSize: '14px'}} className="text-center align-items-center justify-items-center text-danger"> Captação concluída em: {localeDate(props.sale.end_date, 'fullDate', 'pt-BR')}</span>;
			break;
	}

	const saleType = props.type ? props.type.toUpperCase() : 'Unavailable';

	const findIcon = (code: string): string => {
		const currency = currencies.find(currencyParam => currencyParam.id === code);
		try {
			return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
		} catch (err) {
			if (currency) {
				return currency.icon_url;
			}

			return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
		}
	};
	const handleDetailClick = () => {
		const location = {
			//pathname: `/sale/${props.sale.id}`,
			pathname: '/ieo/detail/' + props.sale.id
		};
		history.push(location);
	};
	



	return (
		<div>
			
			<div className="col pricing-table-style-02 text-center px-md-0 sm-margin-30px-bottom xs-margin-15px-bottom wow animate__fadeIn z-index-1 ml--30 mr--30" >
			<ReactCardFlip isFlipped={flip} flipDirection="horizontal">
				<div>
				<div className="sale-item pricing-table box-shadow-large border-radius-10px " style={{minHeight: '580px'}} >
					<div className="sale-item-badge" style={{ backgroundColor: saleBadgeColor }}>{saleBadgeDescription}
					</div>
	
				<img className="itemLogo-img" src={props.sale.image_link} alt="" />
			
				<img className="itemLogo" src={props.sale.sale_logo} alt="" />TOKEN {props.sale.currency_id}
				<div className="pricing-body tokenCard">
						
					<div className="font-weight-500 text-extra-dark-gray ">
						<ul className="list-style-03">

							<div className="font-weight-500 text-extra-dark-gray " style={{marginTop: '-10px', fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Preço unitário:</span><span>R$ {props.sale.price}</span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray mb--10" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Rendimento ao mês:</span><span style={{color: '#13b887'}}>{props.sale.host_uid}</span>
							</div>
							<Separator />
							<div className="font-weight-500 text-extra-dark-gray mt--10" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Investimento mínimo:</span><span style={{}}>R$ 100,00</span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray " style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Carência:</span><span style={{}}>90 dias</span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray mb--10" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Pagamento de juros:</span><span style={{}}>Mensal</span>
							</div>
							<Separator />
							<div className="font-weight-500 text-dark-gray mt--10" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Valor captado:</span><span>Total ofertado:</span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray mb--10" style={{ display: 'flex', justifyContent: 'space-between'}}>
								<span>R$ <Decimal fixed={0} thousSep="." floatSep=",">{((props.sale.total_ieo - props.sale.remains) * props.sale.price)}</Decimal></span><span style={{}}>R$ <Decimal fixed={0} thousSep="." floatSep=",">{(props.sale.total_ieo * props.sale.price)}</Decimal></span>
							</div>
							
							{/*<Progress
								strokeColor={{
								'0%': '#2a9d8f',
								'100%': '#e76f51',
							}}
							status="active"
						
							percent={Math.floor(((props.sale.total_ieo - props.sale.remains) / props.sale.total_ieo) * 100)}
						/>*/}

					<ProgressLinear 
						
						height={20} 
						color='#009991'
						value={Math.floor(((props.sale.total_ieo - props.sale.remains) / props.sale.total_ieo) * 100)}
					 />
							<div className="pricing-footer margin-5px-top mb--10 mt--15">
								<a className="btn btn-more"  onClick={() => setFlip(!flip)}>Mais informações <i className="icon"><FiArrowRight /></i></a>
								<br />
								<br />
								<a className="btn-default" onClick={handleDetailClick}>Comprar Token</a>
							

								
								
														</div>
						</ul>
					</div>
				</div>
				</div>
			</div>
			<div>	
				<div>
					
				<div className="sale-item pricing-table pricing-body text-center justify-content-center  box-shadow-large border-radius-10px " style={{minHeight: '580px'}}>
				<div className="sale-item-badge" style={{ backgroundColor: saleBadgeColor, fontSize: '12px'}}>{saleBadgeDescription}
					</div>
	
			
				<div className="pricing-body tokenCard">
						
					<div className="font-weight-500 text-extra-dark-gray ">
						<ul className="list-style-03">

							<div className="font-weight-500 text-extra-dark-gray mt--5 mb--5" style={{fontSize: '15px', display: 'flex', }}>
								<span>Descrição:</span>
							</div>
							<div className="inner-container font-weight-500 text-extra-dark-gray mb--15" style={{fontSize: '14px', display: 'flex', justifyContent: 'flex-start', textAlign: 'left', height: '80px'}}>
								<span className="display-5 mg-bottom-0" style={{fontSize: '14px', display: 'flex', justifyContent: 'flex-start', textAlign: 'left', maxHeight: '80px'}}>{props.sale.description}</span>
							</div>
							<Separator /> 
							<div className="font-weight-500 text-extra-dark-gray mt--5" style={{display: 'flex', justifyContent: 'center'}}>
								<span>{countdownTitle}</span>

	
							</div>
							<div className="font-weight-500 text-extra-dark-gray" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								{/*<span>Encerramento da captação</span><span style={{}}>{formatDate(props.sale.end_date)}</span>*/}
								<Countdown className = "text-center align-items-center justify-items-center " date={countdownTime} renderer={renderer} />
							</div>
							<Separator />
							<div className="font-weight-500 text-extra-dark-gray mt--15" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Formas de pagamento:</span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray mt--5" style={{fontSize: '14px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Reais (R$)</span><span style={{}}><img style={{ width: '26px', height: '26px', marginLeft: '1rem', }} src={real}/></span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray mt--5" style={{fontSize: '14px', display: 'flex', justifyContent: 'space-between', }}>
								<span style={{}}>Cripto </span><span style={{fontSize: '13px', display: 'flex'}}><img style={{ width: '26px', height: '26px', marginLeft: '1rem', }} src={ether}
									alt="" /><img style={{ width: '26px', height: '26px', marginLeft: '1rem', marginTop: '5px' }} src={usdt}
									alt="" /><img style={{ width: '26px', height: '26px', marginLeft: '1rem', marginTop: '5px' }} src={usdc}
									alt="" /></span>
							</div>
							<div className="font-weight-500 text-extra-dark-gray mt--5 mb--15" style={{fontSize: '14px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Cartão de crédito</span><span style={{}}><img style={{ maxWidth: '160px', height: '26px', marginLeft: '1rem', }} src={ccVisa} /></span>
							</div>
							<Separator />
							<div className="font-weight-500 text-dark-gray mt--15" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Total de tokens ofertados:</span><span style={{}}><Decimal fixed={0} thousSep="." floatSep=",">{props.sale.total_ieo}</Decimal></span>
								
							</div>
							<div className="font-weight-500 text-dark-gray " style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
							<span>Total de tokens disponíveis:</span><span style={{}}><Decimal fixed={0} thousSep="." floatSep=",">{props.sale.remains}</Decimal></span> 
							</div>
							<div className="font-weight-500 text-dark-gray" style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between'}}>
								<span>Progresso:</span><span style={{}}>{Math.floor(((props.sale.total_ieo - props.sale.remains) / props.sale.total_ieo) * 100)}%</span>
							</div>
							{/*<Progress
								strokeColor={{
								'0%': '#2a9d8f',
								'100%': '#e76f51',
							}}
							status="active"
						
							percent={Math.floor(((props.sale.total_ieo - props.sale.remains) / props.sale.total_ieo) * 100)}
						/>*/}
							<div className="pricing-footer margin-5px-top mb--10 mt--15">
								<a className="btn-more" onClick={() => setFlip(!flip)}><i className="icon"><FiArrowLeft /></i> Voltar</a>
								<br />
								<br />
								<button className="btn-primary" onClick={handleDetailClick}>Comprar Token</button>

							
							</div>
						</ul>
					</div>
				</div>

				</div>




			
			</div>
			</div>
			</ReactCardFlip>

			</div>
			

			
			

	






		</div>
		
	);
};