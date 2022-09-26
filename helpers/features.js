export function isFullReleaseVersion() {
    return process.env.releaseVersion == 'full'
}

export function isMvpReleaseVersion() {
    return process.env.releaseVersion == 'mvp'
}
