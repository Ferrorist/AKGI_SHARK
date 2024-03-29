import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const GroupCard = (props) => {
    const { groupData } = props
    const navigate = useNavigate()
    return (
        <Card sx={{
            width: 300,
            margin: 2,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontFamily: 'Pretendard-Medium' }}>
                    {groupData.channelName}
                </Typography>
                <Typography sx={{ mb: 1.5, fontFamily: 'Pretendard-Medium' }} color="text.secondary">
                    {`인원수 : ${groupData.channelCur}/${groupData.channelMax}`}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Pretendard-Medium' }}>
                    {groupData.channelIntro}
                </Typography>
            </CardContent>
            <CardActions>
                <Button sx={{
                    fontFamily: 'Pretendard-Bold', fontSize: '24px', color: 'black',
                    ':hover': {
                        bgcolor: '#997B66',
                        color: 'white',
                    },
                }}
                    size="small"
                    onClick={() => { navigate(`./${groupData.channelIdx}`) }}>
                    참가하기
                </Button>
            </CardActions>
        </Card>
    );
}

export default GroupCard;