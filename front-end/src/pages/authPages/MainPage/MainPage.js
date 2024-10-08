import React from 'react';
import { styled } from '@mui/system';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css'

const BoxWrapper = styled('div')({
    width: '100%',
    height: '100vh ',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#997B66',
    flexDirection: 'column',
})

export default function MainPage() {

    const navigate = useNavigate();

    const navigateToGroup = () => {
        navigate('/group');
    };

    const navigateToSingle = () => {
        navigate('/single');
    };

    return (
        <>
            <div className={styles.backGround}>
                <Navbar />
                <div className={styles.titleBox}>
                    <div className={styles.headerBox}>
                        <p style={{ color: '#8b4513', margin: 2, textAlign: 'left' }}>
                            아름다운 선율을 연주하게 될 당신을 위해
                        </p>
                    </div>
                    <div>
                        <p className={styles.subTitle} style={{ color: '#F5A760', margin: 3 }} >
                            온라인으로 연습하는 악기 연주
                        </p>
                        <br />
                        <p className={styles.info} style={{ color: '#000000', margin: 4, fontWeight: 'normal' }}>
                            친구들과 함께든 혼자서든<br />
                            원하는 대로 즐기세요<br />
                        </p>
                    </div>
                    <div className={styles.buttonBox} >
                        <button onClick={navigateToGroup}
                            className={styles.groupPlayBtn}
                        >
                            함께 하기
                        </button>
                        <button onClick={navigateToSingle}
                            className={styles.singlePlayBtn}
                        >
                            혼자 하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}