$(function(){
	let $lis=$('.navbar-container>li')
	for(let i=0;i<$lis.length;i++){
		$lis.eq(i).on('click',function(e){
			let $li=$(e.currentTarget)
			let index=$li.index()
			$li.addClass('active')
				.siblings('.active').removeClass('active')
			$('.tab-content>li').eq(index).addClass('tabActive')
				.siblings('.tabActive').removeClass('tabActive')
		})
	}



	$.get('./songs.json').then(function(response){
		let $songs=response
		$songs.forEach((i)=>{
			let $li=$(`
				<div class="newest-row">
				<a href="./song.html?id=${i.id}">
					<div class="newest-row-1">
						<p class="newest-row1">${i.name}</p>
						<p class="newest-row2">
							<i class="sq"></i>${i.author}-${i.album}
						</p>
					</div>
					<div class="newest-row-2"></div>
				</a>	
				</div>
			`)
			$li.appendTo('.newest')
		})
		$('#newestLoading').remove()
		// 热歌榜
		$songs.forEach((i)=>{
			let ranks=i.id<10?'0'+i.id:i.id
			let $rank=$(`
				<div class="hot-row">
					<a href="./song.html?id=${i.id}">
						<span class="hot-left">
							<span class="hot-ranking">${ranks}</span>
							<div class="hot-row-1">
								<p class="hot-row1">${i.name}</p>
								<p class="hot-row2">
									<i class="sq"></i>${i.author}-${i.album}
								</p>
							</div>
						</span>
						<div class="hot-row-2"></div>
					</a>
				</div>
			`)
			$rank.appendTo('.hotcontent')
		})
	})

})