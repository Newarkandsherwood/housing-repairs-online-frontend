export function isMvpReleaseVersion() {
  return process.env.RELEASE_VERSION === 'mvp';
}

export function enableLeaserHolderFlow() {
  return process.env.ENABLE_LEASEHOLDER_FLOW == "true";
}
