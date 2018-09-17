$(function(){
	let $lis=$('.navbar-container>li')
	for(let i=0;i<$lis.length;i++){
		$lis.eq(i).on('click',function(e){
			let $li=$(e.currentTarget)
			$li.addClass('active')
				.siblings('.active').removeClass('active')
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
	})
})