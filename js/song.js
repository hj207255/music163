$(function(){

	// 引入leancloud
	var APP_ID = 'wS0ILJoH4VTvPdX99Qy59Na2-gzGzoHsz';
	var APP_KEY = 'RINAYT0lB2AzFXRhSLwFqY8i';

	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});

	
	//使用leancloud获取歌词
	var query = new AV.Query('songs');
  	query.find().then(function (response){
  		//获取到地址栏中的id
		let id=location.search.match(/\bid=([^&]*)/)[1]

  		$('#newestLoading').remove()

  		let $songz=response
		let $songs=$songz.filter((results)=>{return results.attributes.id===id})
		let $song=$songs[0].attributes

		let audio=document.createElement('audio')
		audio.src=$song.url
		audio.oncanplay=function(){
			audio.play()
		}

		$('#name').text($song.name)
		$('#author').text($song.author)
		let $img=$(`
			<img class="songbg" src='${$song.songbg}'>
			`)
		$img.appendTo('.record')

		$('.music-song').css('background-image','url('+$song.background+')')



		let lyric=$song.lyric
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

/******************************点击暂停*************************************/
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

/******************************歌词滚动效果*************************************/
		setInterval(()=>{
			let second=audio.currentTime
			let munite=~~(second/60)
			let csecond=second-(munite*60)
			munite=munite<=10?'0'+munite:munite
			csecond=csecond<=10?'0'+csecond:csecond
			let time=`${munite}:${csecond}`
			let $ps=$('.lyric-inner-cover>p')
			let $currentp
			for(let i=0;i<$ps.length;i++){
				if($ps.eq(i).attr('data-time')<time&&$ps.eq(i+1).attr('data-time')>time&&$ps.eq(i+1)!==0){
					$currentp=$ps.eq(i)
					break
				}
			}
			if($currentp){
				$currentp.addClass('active').prev().removeClass('active')
				let $currentTop=$currentp.offset().top
				let $top=$('.lyric-inner-cover').offset().top
				let $s=$currentTop-$top-$('.lyric-inner').height()/3
				$('.lyric-inner-cover').css('transform',`translateY(-${$s}px)`)
			}
		},500)

  	})

	
// 	$.get('./songs.json').then(function(response){

		
		
// 		let $songs=response
// 		let $song=$songs.filter((i)=>{return i.id===id})
// 		let audio=document.createElement('audio')
// 		audio.src=$song[0].url
// 		audio.oncanplay=function(){
// 			audio.play()
// 		}

// 		$('#name').text($song[0].name)
// 		$('#author').text($song[0].author)
// 		let $img=$(`
// 			<img class="songbg" src='${$song[0].songbg}'>
// 			`)
// 		$img.appendTo('.record')

// 		$('.music-song').css('background-image','url('+$song[0].background+')')



// 		let lyric=$song[0].lyric
// 		let array=lyric.split('\n')
// 		let regex=/^\[(.+)\](.*)$/
// 		array=array.map(function(string,index){
// 			let matches=string.match(regex)
// 			if(matches){
// 				return {time:matches[1],words:matches[2]}
// 			}
// 		})
// 		let $lyric=$('.lyric-inner-cover')
// 		array.map(function(object){
// 			if(!object){return}
// 			let $p=$('<p/>')
// 			$p.attr('data-time',object.time).text(object.words)
// 			$p.appendTo($lyric)
// 		})

// /******************************点击暂停*************************************/
// 		$('.mask').on('click',function(){
// 			if(!audio.paused){
// 				audio.pause()
// 				$('.record').addClass('playing')
// 				$('.mask>img').addClass('playing')
// 			}else{
// 				audio.play()
// 				$('.record').removeClass('playing')
// 				$('.mask>img').removeClass('playing')
// 			}
// 		})

// /******************************歌词滚动效果*************************************/
// 		setInterval(()=>{
// 			let second=audio.currentTime
// 			let munite=~~(second/60)
// 			let csecond=second-(munite*60)
// 			munite=munite<=10?'0'+munite:munite
// 			csecond=csecond<=10?'0'+csecond:csecond
// 			let time=`${munite}:${csecond}`
// 			let $ps=$('.lyric-inner-cover>p')
// 			let $currentp
// 			for(let i=0;i<$ps.length;i++){
// 				if($ps.eq(i).attr('data-time')<time&&$ps.eq(i+1).attr('data-time')>time&&$ps.eq(i+1)!==0){
// 					$currentp=$ps.eq(i)
// 					break
// 				}
// 			}
// 			if($currentp){
// 				$currentp.addClass('active').prev().removeClass('active')
// 				let $currentTop=$currentp.offset().top
// 				let $top=$('.lyric-inner-cover').offset().top
// 				let $s=$currentTop-$top-$('.lyric-inner').height()/3
// 				$('.lyric-inner-cover').css('transform',`translateY(-${$s}px)`)
// 			}
// 		},500)
// 	})



})

