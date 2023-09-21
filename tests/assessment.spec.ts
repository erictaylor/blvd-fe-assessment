import { expect, test } from '@playwright/test';

const VERIFIED_EMAIL = 'eric@daxos.com';
const ALIASED_EMAIL = 'eric+alias@daxos.com';
const DISPOSABLE_EMAIL = 'nabfwwalpxvkucehce@cwmxc.com';
const UNVERIFIED_EMAIL = 'test@vasdfiewsiw.com';
const INVALID_EMAIL = 'invalid';

test('the empty state of the app', async ({ page }) => {
	await page.goto('/');

	// Ensure the page heading is visible
	await expect(
		page.getByRole('heading', {
			level: 2,
			name: 'Validate email addresses',
		}),
	).toBeVisible();

	const input = page.getByRole('textbox', { name: 'Email address' });

	// Ensure the input is visible
	await expect(input).toBeVisible();
	await expect(input).not.toBeDisabled();

	const submitButton = page.getByRole('button', { name: 'Validate' });

	// Ensure the submit button is visible
	await expect(submitButton).toBeVisible();
	await expect(submitButton).not.toBeDisabled();

	// Make sure the empty state is being displayed
	await expect(page.getByText('No results.')).toBeVisible();
});

test('submitting email addresses to verify', async ({ page }) => {
	await page.goto('/');

	const input = page.getByRole('textbox', { name: 'Email address' });
	const submitButton = page.getByRole('button', { name: 'Validate' });

	await input.fill(VERIFIED_EMAIL);
	await submitButton.click();

	const table = page.getByRole('table', { name: 'Email validation results' });

	await expect(table).toBeVisible();

	const firstEmailRow = page.getByRole('row', { name: VERIFIED_EMAIL });

	await expect(firstEmailRow).toBeVisible();

	expect(await firstEmailRow.innerText()).toContain('✅');

	await input.fill(ALIASED_EMAIL);
	await submitButton.click();

	const aliasRow = page.getByRole('row', { name: ALIASED_EMAIL });

	await expect(aliasRow).toBeVisible();

	const aliasRowText = await aliasRow.innerText();

	expect(aliasRowText).toContain('✅');
	expect(aliasRowText).toContain('Y');

	await input.fill(DISPOSABLE_EMAIL);
	await submitButton.click();

	const disposableRow = page.getByRole('row', { name: DISPOSABLE_EMAIL });

	await expect(disposableRow).toBeVisible();

	const disposableRowText = await disposableRow.innerText();

	expect(disposableRowText).toContain('✅');
	expect(disposableRowText).toContain('🚮');

	await input.fill(UNVERIFIED_EMAIL);
	await submitButton.click();

	const unverifiedRow = page.getByRole('row', { name: UNVERIFIED_EMAIL });

	await expect(unverifiedRow).toBeVisible();

	const unverifiedRowText = await unverifiedRow.innerText();

	expect(unverifiedRowText).toContain('⛔️');
});

test('user should not be able to send invalid email format via input', async ({
	page,
}) => {
	await page.goto('/');

	const input = page.getByRole('textbox', { name: 'Email address' });
	const submitButton = page.getByRole('button', { name: 'Validate' });

	await input.fill('invalid email format');
	await submitButton.click();

	await expect(page.locator('input#email:invalid')).toBeVisible();

	await expect(page.getByText('No results.')).toBeVisible();
});

/**
 * This test covers the case that some how an improperly formatted email address
 * is sent to the API, which should result in a response marking the format as bad.
 *
 * We have hack our way around for this test, because we are relying on the browsers
 * built in email format check for input[type=email].
 *
 * So for this test we are going to modify the type to text, and then fill out the form
 * with an invalid email address.
 */
test('forced invalid format email result', async ({ page }) => {
	await page.goto('/');

	const input = page.getByRole('textbox', { name: 'Email address' });
	const submitButton = page.getByRole('button', { name: 'Validate' });

	await page.$eval('input#email', (el) => el.setAttribute('type', 'text'));
	await input.fill(INVALID_EMAIL);
	await submitButton.click();

	const invalidEmailRow = page.getByRole('row', { name: INVALID_EMAIL });

	await expect(invalidEmailRow).toBeVisible();

	const invalidEmailRowText = await invalidEmailRow.innerText();

	expect(invalidEmailRowText).toContain('⛔️');
	expect(invalidEmailRowText).toContain('👎');
});
