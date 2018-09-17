$(function(){
	$.get('./lyric.json').then(function(object){
		let {lyric}=object
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
	})
	let audio=document.createElement('audio')
	audio.src='//m10.music.126.net/20180917085531/789e9e517a3896e809fea62cc937cfdc/ymusic/8f33/9c3d/e2c0/4281cd2899165a4637baa6107c7e6def.mp3'
	audio.oncanplay=function(){
		audio.play()
	}
	

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


	// let $lyric1=$('.lyric-inner-cover');
	// let n=0
	// setInterval(function(){
	// 	if(n<55){
	// 		let s=8.5*n
	// 		$lyric1.css({transform:'translateY(-'+s+'vw)'})
	// 		n=n+1
	// 	}
	// },100)
})

