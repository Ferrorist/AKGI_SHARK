import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputWithLabel from './../../../../components/InputWithLabel';

import { createGroupAction } from './createGroupAction';
import loadGroupAction from '../loadGroupAction';

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

const GroupCreateModal = (props) => {
    const { isModalOpen, setIsModalOpen, setGroupList } = props
    const [groupName, setGroupName] = useState('')
    const [groupIntro, setGroupIntro] = useState('')
    const [channelMax, setChannelMax] = useState(1)

    const groupDetail = {
        "channelName": groupName,
        "channelIntro": groupIntro,
        "channelMax": channelMax,
    }

    useEffect(() => {
        const action = async () => {
            console.log('이거실행되나요?')
            await loadGroupAction(setGroupList)
        }
        action()
    }, [isModalOpen, setGroupList, setIsModalOpen])

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

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ fontFamily: 'Pretendard-Bold', fontWeight: 'bolder' }}>
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
                    <Button sx={{
                        fontFamily: 'Pretendard-Medium',
                        backgroundColor: '#997B66',
                        color: '#997B66',
                    }}
                        onClick={() => {
                            createGroupAction(groupDetail)
                            setIsModalOpen(false)
                            setChannelMax(2)
                            setGroupIntro('')
                            setGroupName('')
                        }}>
                        그룹 생성하기</Button>
                </Box>
            </Modal>
        </div >
    );
};

export default GroupCreateModal;