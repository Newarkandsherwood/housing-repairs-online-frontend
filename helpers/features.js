export function isMvpReleaseVersion() {
  return process.env.RELEASE_VERSION === 'mvp';
}

export function enableLeaseHolderFlow() {
  return process.env.ENABLE_LEASEHOLDER_FLOW == 'true';
}
