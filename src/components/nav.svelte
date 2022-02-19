<script>
    import {user, signOut} from '../stores/testuser';

</script>
<nav>
<div  class="navbar bg-base-100 mb-40 shadow-xl rounded-xl">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a href="/">Homepage</a></li>
                <li><a href="/log">Log</a></li>
                <li><a href="/mapview">Map View</a></li>
                <li><a href="/help">Help</a></li>
            </ul>
        </div>
    </div>
    <div class="navbar-center">
        <a href="/" class="btn btn-ghost normal-case text-xl">FlagTUK</a>
    </div>
    <div class="navbar-end">

        {#if $user.authenticated}
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791">
              </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a href="/profile" class="justify-between">
                  Profile
                </a>
              </li>
              <li><a>Settings</a></li>
               <li><a on:click="{signOut}">Logout
                    <label class="mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                     </svg></label>
                </a></li>
            </ul>
          </div>

        {:else}
        <div class="navbar-end">
            <!--
                TODO: We want to stay in the same page instead of going to the /profile page. 
                        Fix later...
            -->
            <a href="/profile" class="btn btn-ghost normal-case text-xl">Login</a>
        </div>
        {/if}
    </div>
</div>
</nav>

