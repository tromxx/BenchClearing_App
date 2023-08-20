import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
    .modal {
        display: none; // 평소에는 숨겨진 상태로 시작
        position: fixed; // 스크롤을 했을 경우에도 동일한 위치에 있도록
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        animation: modal-bg-show 0.8s; // 팝업이 열릴 때 스르륵 열리는 효과
    }

  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
    width: 60px;
    height: 40px;
    margin: 5px;
  }
  .modal > section {
    width: 90%;
    max-width: 400px;
    text-align: center;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  .modal > section > header {
    position: relative;
    text-align: left;
    padding: 16px 64px 16px 16px;
    background-color: #395144;
    font-weight: 700;
    color: white;
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
    
  }
  .modal > section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #395144;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;


const Modal = (props) => {
    const {open, confirm, close, type, header, children} = props;

    return(
       <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
            {open && 
            <section>
                <header>
                    {header}
                    <button onClick={close}>
                        &times;
                    </button>
                </header>
                <main>{children}</main>
                <footer>
                    {type && <button onClick={confirm}>확인</button>}
                    <button onClick={close}>닫기</button>
                </footer>
            </section>
            }

        </div>
       </ModalStyle>
    );

}

export default Modal;