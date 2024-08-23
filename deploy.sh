#!/bin/bash

set -e
VERCEL_FORCE_NO_BUILD_CACHE=1 pnpm next build && pnpm next export
aws --profile=pax s3 sync --delete --acl=public-read ./out/ s3://docs.pax.dev/
aws --profile=pax cloudfront create-invalidation --distribution-id=E2EYK7TMGOPCYY --paths "/*"
