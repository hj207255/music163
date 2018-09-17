$(function(){

	let id=location.search.match(/\bid=([^&]*)/)[1]
	$.get('./songs.json').then(function(response){
		let $songs=response
		let $song=$songs.filter((i)=>{return i.id===id})
		console.log($song[0].url)
		let audio=document.createElement('audio')
		audio.src=$song[0].url
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
	})


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

