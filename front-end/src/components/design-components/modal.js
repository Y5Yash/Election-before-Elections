import React from 'react';
import QRCode from 'react-qr-code';
import Loader from './Loader';
import './modal.css';
import styled from 'styled-components';

const StyledModalContainer = styled.div`
  position: absolute;
  bottom: 35%;
  left: ${(props) => props.reclaimUrl ? '24%' : '37%' }
`;
export function Modal (props) {
  console.log(props);
  const reclaimUrl = props && props.QRLink;
  return (
    <div className='modal-wrapper'>
      <div className='modal-overlay'></div>
      <StyledModalContainer className='modal-container' reclaimUrl={reclaimUrl}>
        {reclaimUrl ? (<QRCode value={reclaimUrl} size={200} style={{ width: '100%' }} />) : <Loader height={200} width={100} color='#c5e4ff' />}
      </StyledModalContainer>
    </div>
  );
}