<script>
  // The curtain. Shown in place of the page when nobody is signed in.
  let { onSignIn, busy = false, error = '' } = $props();
</script>

<div class="gate">
  <div class="panel">
    <svg width="28" height="28" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <rect x="2" y="8" width="6" height="6" fill="var(--valid-mid)" />
      <rect x="8" y="2" width="6" height="6" fill="var(--txn-mid)" />
    </svg>

    <h1>The Future of Case Management IT</h1>

    <p>
      This is an internal working draft. Sign in with your government account to read it.
    </p>

    {#if error}
      <p class="error" role="alert">{error}</p>
    {/if}

    <button class="go" onclick={onSignIn} disabled={busy}>
      {busy ? 'Signing in…' : 'Sign in with IDIR'}
    </button>

    <p class="fine">
      Nothing on this site is a government commitment, and none of it is a record of any real
      person.
    </p>
  </div>
</div>

<style>
  .gate {
    min-height: 70vh;
    display: grid;
    place-items: center;
    padding: 2rem 1rem;
  }
  .panel {
    max-width: 34rem;
    text-align: left;
  }
  h1 {
    font-size: var(--step-2);
    margin: 0.8rem 0 0.6rem;
  }
  p {
    color: var(--muted);
    max-width: 46ch;
  }
  .go {
    font-family: var(--font-ui);
    font-size: var(--step-0);
    font-weight: 600;
    margin: 1.4rem 0 1.8rem;
    padding: 0.7rem 1.2rem;
    min-height: 44px;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    background: var(--paper-raised);
    color: var(--ink);
    cursor: pointer;
  }
  .go:hover:not(:disabled) {
    background: color-mix(in oklab, var(--paper-raised) 88%, var(--ink));
  }
  .go:disabled {
    cursor: progress;
    opacity: 0.7;
  }
  .error {
    color: var(--ink);
    border-left: 3px solid var(--valid-mid);
    padding-left: 0.8rem;
  }
  .fine {
    font-size: var(--step--1);
  }
</style>
