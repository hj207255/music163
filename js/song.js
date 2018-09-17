$(function(){

	let id=location.search.match(/\bid=([^&]*)/)[1]
	$.get('./songs.json').then(function(response){
		let $songs=response
		let $song=$songs.filter((i)=>{return i.id===id})
		let audio=document.createElement('audio')
		audio.src=$song[0].url
		audio.oncanplay=function(){
			audio.play()
		}

		$('#name').text($song[0].name)
		$('#author').text($song[0].author)
		let $img=$(`
			<img class="songbg" src='${$song[0].songbg}'>
			`)
		$img.appendTo('.record')

		$('.music-song').css('background-image','url('+$song[0].background+')')

		let lyric=$song[0].lyric
		let array=lyric.split('\n')
		let regex=/^\[(.+)\](.*)$/
		array=array.map(function(string,index){
			let matches=string.match(regex)
			if(matches){
				return {time:matches[1],words:matches[2]}
			}
		})
		let $lyric=$('.lyric-inner-cover')
		array.map(function(object){
			if(!object){return}
			let $p=$('<p/>')
			$p.attr('data-time',object.time).text(object.words)
			$p.appendTo($lyric)
		})

		$('.mask').on('click',function(){
			if(!audio.paused){
				audio.pause()
				$('.record').addClass('playing')
				$('.mask>img').addClass('playing')
			}else{
				audio.play()
				$('.record').removeClass('playing')
				$('.mask>img').removeClass('playing')
			}
		})


		// setInterval(function(){
		// 	let second=audio.currentTime
		// 	let munite=~~(second/60)
		// 	let csecond=second-(munite*60)
		// 	munite=munite<=10?'0'+munite:munite
		// 	csecond=csecond<=10?'0'+csecond:csecond
		// 	let time=`${munite}:${csecond}`
		// 	let $ps=$('.lyric-inner-cover>p')
		// 	for(let i=0;i<$ps.length;i++){
		// 		if($ps.eq(i).attr('data-time')<time&&$ps.eq(i+1).attr('data-time')>time){
		// 			$ps.eq(i)
		// 		}
		// 	}
		// },1000)
	})



})

