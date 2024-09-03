docker_build(
    'reckon-api',
    context='.',
    dockerfile='./deploy/api.dockerfile',
    only=['./api/'],
    live_update=[
        sync('./api/', '/app/api/'),
        run(
            'npm install',
            trigger=['./api/package.json', './api/package-lock.json']
        )
    ]
)
k8s_yaml('deploy/api.yaml')

k8s_resource(
    'api',
    port_forwards='5734:3001',
    labels=['backend']
)

docker_build(
    'reckon-web',
    context='.',
    dockerfile='./deploy/web.dockerfile',
    only=['./web/'],
    ignore=['./web/dist/'],
    live_update=[
        fall_back_on('./web/next.config.mjs'),
        sync('./web/', '/app/'),
        run(
            'npm install',
            trigger=['./web/package.json', './web/package-lock.json']
        )
    ]
)

k8s_yaml('deploy/web.yaml')

k8s_resource(
    'web',
    port_forwards='5735:3000',
    labels=['frontend']
)

tiltfile_path = config.main_path