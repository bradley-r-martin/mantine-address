## Context

AddressInput currently has an optional `provider` and a boolean `allowsManualEntry` (default true). When there is no provider and `allowsManualEntry` is false, the input is disabled and shows a "provider required" error. When `allowsManualEntry` is true and there is no provider, the input is enabled and focus/click opens the manual-entry modal. This creates two modes for "no provider" that depend on a prop whose name suggests it's about allowing manual entry, not about requiring a provider. The change simplifies the model: no provider implies manual-only; when a provider is set, a single opt-out prop controls whether manual entry is offered.

## Goals / Non-Goals

**Goals:**

- Enforce "no provider → manual input only" with no disabled/error state.
- Replace `allowsManualEntry` with `preventManualEntry` (inverted, default false).
- Restrict `preventManualEntry` to "when provider is set" in types and behavior so the API is clear.

**Non-Goals:**

- Changing the manual-entry modal UI or form fields.
- Adding new providers or changing lookup behavior.
- A separate migration guide document.

## Decisions

1. **No-provider branch: always manual-only, no conditional**
   - **Choice**: When `provider == null`, always render the same path: enabled input, focus/click opens manual modal. Remove the branch that checks `allowsManualEntry` and renders disabled + error.
   - **Rationale**: Single, predictable behavior when no provider; no need for `preventManualEntry` in this branch.
   - **Alternative**: Keep a "strict mode" that disables when no provider. Rejected so that "no provider" has one meaning: manual-only.

2. **Prop rename: `preventManualEntry` instead of deprecating `allowsManualEntry`**
   - **Choice**: Remove `allowsManualEntry` and add `preventManualEntry` (default false). Document as breaking.
   - **Rationale**: Inverted name matches the only remaining use case (opt-out when provider is set). Cleaner than supporting both or a deprecated alias.
   - **Alternative**: Keep `allowsManualEntry` and add `preventManualEntry` as alias. Rejected to avoid maintaining two names.

3. **Where `preventManualEntry` is applied**
   - **Choice**: Only in the "provider is set" path: when building dropdown data for no-results, use `!preventManualEntry` to decide whether to include the "Enter manually" option. Do not read `preventManualEntry` in the no-provider branch.
   - **Rationale**: Spec says the prop is only meaningful when a provider is set; implementation should reflect that.

4. **TypeScript typings**
   - **Choice**: Add `preventManualEntry?: boolean` to the props interface; remove `allowsManualEntry`. No conditional type that hides `preventManualEntry` when provider is absent (that would complicate usage). Rely on JSDoc to state that the prop only has effect when a provider is set.
   - **Rationale**: Conditional props based on another prop are possible but add complexity; documentation is sufficient for this library.

## Risks / Trade-offs

- **Breaking change**: Consumers using `allowsManualEntry={false}` must switch to `preventManualEntry={true}`. Mitigation: single, clear breaking change; no silent behavior change for default usage (no provider + default was already manual-only).
- **Misuse**: A consumer might set `preventManualEntry={true}` with no provider expecting to "require provider". Mitigation: with no provider we ignore the prop and always allow manual entry; JSDoc and docs should state that `preventManualEntry` applies only when a provider is set.
