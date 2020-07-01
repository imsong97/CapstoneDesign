let content = document.getElementById("contents");

function contents(prediction){
    $.get("/contents.json", function(data) {
        if (prediction[0].probability>=0.7){
            content.innerHTML = "<div class='res-title'><strong>사람을 만나 당신의 긍정 에너지를 나누어 주세요</strong></div>"
                                + "<div class='contents-music'><a href="+data.music_s[Math.floor(Math.random()*data.music_s.length)]+" target='_blank'>신나는 음악 들으러 GO</a></div>" 
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상:)" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[Math.floor(Math.random()*data.smile.length)]+" target='_blank'>" + "웃음의 기능" + "</a></div>"
                                + "<div class='contents-book-smile'><img src="+data.book_smile[Math.floor(Math.random()*data.book_smile.length)]+" alt='책 소개 1'/><img src="+data.book_smile[Math.floor(Math.random()*data.book_smile.length)]+" alt='책 소개 2'/></div>";
        }else if(prediction[0].probability>=0.4){
            content.innerHTML = "<div class='res-title'><strong>감정의 변화가 필요해요. 좋아하는 음악을 찾아 감성을 발휘해 보는 것이 어떨까요?</strong></div>"
                                + "<div class='contents-music'><a href="+data.music_a[Math.floor(Math.random()*data.music_a.length)]+" target='_blank'>기분전환 음악 들으러 GO</a></div>"  
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상:)" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.relaxation[Math.floor(Math.random()*data.relaxation.length)]+" target='_blank'>" + "기분전환하는 여러가지 방법!" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[Math.floor(Math.random()*data.smile.length)]+" target='_blank'>" + "웃음의 기능" + "</a></div>"
                                + "<div class='contents-book-smile'><img src="+data.book_smile[Math.floor(Math.random()*data.book_smile.length)]+" alt='책 소개 1'/><img src="+data.book_angry[Math.floor(Math.random()*data.book_angry.length)]+" alt='책 소개 2'/></div>"
                                + "<div class='contents-comment'>"+data.comment[Math.floor(Math.random()*data.comment.length)]+"</div>";
        }else{
            content.innerHTML = "<div class='res-title'><strong>기분이 안좋아보이네요. 부정적인 감정을 해소시키는 것이 좋겠군요</strong></div>"
                                + "<div class='contents-music'><a href="+data.music_a[Math.floor(Math.random()*data.music_a.length)]+" target='_blank'>기분전환 음악 들으러 GO</a></div>"  
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상:)" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.relaxation[Math.floor(Math.random()*data.relaxation.length)]+" target='_blank'>" + "기분전환하는 여러가지 방법!" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[Math.floor(Math.random()*data.smile.length)]+" target='_blank'>" + "웃음의 기능" + "</a></div>"
                                + "<div class='contents-book-angry'><img src="+data.book_angry[Math.floor(Math.random()*data.book_angry.length)]+" alt='책 소개 1'/><img src="+data.book_angry[Math.floor(Math.random()*data.book_angry.length)]+" alt='책 소개 2'/></div>"
                                + "<div class='contents-comment'>"+data.comment[Math.floor(Math.random()*data.comment.length)]+"</div>";
        }
    });
}