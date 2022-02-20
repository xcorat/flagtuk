<script>
    let quicklinks = [
        { id: 'taxi-meter', title: "Meter", image_path: "/images/taxi-meter.png", link:"/taximeter"},
        { id: 'ride', title: "Ride", image_path: "/images/raise-hand.png", link:"/testgun"},
        { id: 'drive', title: "Drive", image_path: "/images/drive-steering-wheel.png", link:"/testgun"},
      //  { id: 'msg-board', title: "Message Board", image_path: "/images/drive-steering-wheel.png", link:"/ride"}
    ]
</script>

<quicklinks>
<div id="quicklinks" class="p-4 gap-5 shadow-sm grid grid-cols-3 lg:grid-cols-4 items-center justify-center">
{#each quicklinks as quicklink}
<div class="card h-full items-center shadow-xl clickable">
<!-- TODO: there was a better masking trick to add a link to div. find later -->
  <a class="flex flex-col content-between" href="{quicklink.link}">
    <!-- TODO: How the fuck do we make the text go to the bottom here? -->
    <figure class="px-10 pt-10 max-h-54"><img src="{quicklink.image_path}" alt="{quicklink.id}"></figure>
    <div class="card-body text-center border-2">
      <h2 class="card-title">{quicklink.title}</h2>
    </div>
  </a>
</div>
{/each}
</div>
</quicklinks>

<style>
    .clickable:active {
        transform:scale( var(--btn-focus-scale, .95) )
    }
    .clickable:hover {
        background-color: hsl(var(--b2));
    }
</style>