import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import GroupAddBox from './GroupAddBox';
import styles from './GroupBox.module.css'
import GroupCard from './GroupCard';
import loadGroupAction from '../loadGroupAction';
import { createGroupAction } from './createGroupAction';
import InputWithLabel from '../../../../components/InputWithLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const GroupBox = (props) => {
    const navigate = useNavigate()
    const { groupList, setGroupList } = props
    const itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    let lastItem = currentPage * itemsPerPage
    let fisrtItem = lastItem - itemsPerPage
    const [showGroup, setShowGroup] = useState([])
    const [groupName, setGroupName] = useState('')
    const [groupIntro, setGroupIntro] = useState('')
    const [channelMax, setChannelMax] = useState(1)

    const groupDetail = {
        "channelName": groupName,
        "channelIntro": groupIntro,
        "channelMax": channelMax,
    }

    const handleCreateGroupAction = async () => {
        if(groupName.trim().length !== 0){
            const createRes = await createGroupAction(groupDetail)
            console.log('werionbioaerwbnioerwnboiaernboiern', createRes)
            setIsModalOpen(false)
            // setChannelMax(2)
            setGroupIntro('')
            setGroupName('')
            navigate(`/group/${createRes}`)
        }
    }

    // 페이지에 로드할 그룹리스트를 요청하고 그룹 리스트가 존재한다면 보여줄 그룹을 랜더링
    useEffect(() => {
        const check = async () => {
            const res = await loadGroupAction(setGroupList)
            console.log('뭐가 문제지', res)
            if (res !== undefined) {
                setGroupList(res)
                setShowGroup(res.slice(fisrtItem, lastItem));
            } else {
                
            }

        }
        check()
    }, [fisrtItem, lastItem])


    // modal이 열고 닫힐때 마다, 그룹을 로드
    useEffect(() => {
        const action = async () => {
            const res = await loadGroupAction(setGroupList)
            if (res === undefined) {
                navigate('/login')
            }
            setGroupList(res)
            setShowGroup(res.slice(fisrtItem, lastItem));
        }
        action()
    }, [isModalOpen, setGroupList, setIsModalOpen, fisrtItem, lastItem])

    // 채널생성 값을 받을때 이상한 값 있는지 확인
    useEffect(() => {
        if (!isNaN(channelMax)) {
            setChannelMax(parseInt(channelMax))
        }
        if (channelMax >= 6) {
            if (channelMax > 10) {
                setChannelMax(channelMax % 10)
            } else {
                setChannelMax(6)
            }
        }
        if (channelMax <= 2) {
            setChannelMax(2)
        }
    }, [channelMax])


    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenGroupCreatePage = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className={styles.groupBox}>
                <div className={styles.innerBox}>
                    <GroupAddBox openModal={handleOpenGroupCreatePage} />
                    {
                        showGroup.map((element, i) => {
                            return (
                                <GroupCard key={i} groupData={element} />
                            )
                        })
                    }
                    <div className={styles.innerFooter}>
                        <Stack spacing={2}>
                            {
                                groupList ? (<Pagination
                                    count={Math.ceil(groupList.length / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handleChange} />) : null
                            }

                        </Stack>
                    </div>
                </div>
                {/* <GroupCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setGroupList={setGroupList} /> */}
            </div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2"
                        sx={{ fontFamily: 'Pretendard-Bold', textAlign: 'center', borderBottom: '2px solid black' }}>
                        그룹 생성
                    </Typography>
                    <div>
                        <InputWithLabel
                            label='그룹명을 입력하세요'
                            value={groupName}
                            setValue={setGroupName}
                            type='text'
                            placeholder='그룹명'
                            maxLength='15'
                        />
                        <p id="blankGroup" style={{display: groupName.trim().length === 0 ? 'block' : 'none'}}>그룹명을 적어주세요.</p>
                        <InputWithLabel
                            label='그룹 설명을 입력하세요'
                            value={groupIntro}
                            setValue={setGroupIntro}
                            type='text'
                            placeholder='채널 설명'
                            maxLength='15'
                        />
                    </div>
                    <InputWithLabel
                        label='채널 인원수를 입력하세요'
                        value={channelMax}
                        setValue={setChannelMax}
                        type='number'
                        placeholder='인원수'
                        max='6'
                        min='2'
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                        <Button variant="contained"
                            onClick={() => {
                                handleCreateGroupAction()
                            }}
                            sx={{
                                marginTop: '5px',
                                fontFamily: 'Pretendard-Medium',
                                backgroundColor: '#997B66',
                                color: 'white',
                                ':hover': {
                                    bgcolor: '#997B66',
                                    color: 'white',
                                },
                            }}
                        >그룹 생성하기</Button>
                    </div>
                </Box>
            </Modal>

        </>
    );
};

export default GroupBox;