<script>
    export let badgeTitle;  
    export let badgeMessage;  
    export let badgeAction;  
</script>

    <div class="relative isolate flex items-center gap-x-6 overflow-hidden bg-fortem1neutral-700 py-2.5 px-6 sm:px-3.5 sm:before:flex-1 border-b-[1px] border-fortem1green-700">
        <div class="flex flex-wrap items-center gap-y-2 gap-x-2">
        <p class="text-sm leading-6 text-slate-200">
            <strong class="bg-slate-200 text-slate-900 font-semibold rounded-md border border-solid border-slate-200 py-0.5 px-3.5">{badgeTitle}</strong>
            <svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
            {badgeMessage}
            <svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
        </p>
        <a href="#" class="flex-none rounded-full bg-fortem1green-700 py-0.5 px-3.5 text-sm font-semibold text-fortem1neutral-900 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">{badgeAction} <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div class="flex flex-1 justify-end">
        <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span class="sr-only">Dismiss</span>
            <svg class="h-5 w-5 text-slate-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
        </button>
        </div>
    </div>

<style>   
</style>