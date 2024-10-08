package org.example.back.Channel.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.Channel.entity.ChannelEntity;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetChannelResponseDto {

    private int channelIdx;
    private String channelName;
    private String channelIntro;
    private Date channelDate;
    private int channelMax;
    private int channelCur;
    private int channelIsDelete;

    public GetChannelResponseDto(ChannelEntity entity){
        this.channelIdx = entity.getChannelIdx();
        this.channelName = entity.getChannelName();
        this.channelIntro = entity.getChannelIntro();
        this.channelDate = entity.getChannelDate();
        this.channelMax = entity.getChannelMax();
        this.channelCur = entity.getChannelCur();
        this.channelIsDelete = entity.getChannelIsDelete();
    }
}
