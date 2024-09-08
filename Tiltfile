# load('ext://configmap', 'configmap_create')
# Create config map for web
# configmap_create('web-config', from_env_file='./web/.env')

# docker_build(
#     'reckon-web',
#     context='.',
#     dockerfile='./deploy/web.dockerfile',
#     only=['./web/'],
#     ignore=['./web/dist/'],
#     live_update=[
#         fall_back_on('./web/next.config.mjs'),
#         sync('./web/', '/app/'),
#         run(
#             'npm install',
#             trigger=['./web/package.json', './web/package-lock.json']
#         )
#     ]
# )

# k8s_yaml('deploy/web.yaml')

# k8s_resource(
#     'web',
#     port_forwards='5735:3000',
#     labels=['frontend']
# )

k8s_yaml('deploy/adminer.yaml')

k8s_resource(
    'adminer',
    port_forwards='5736:8080',
    labels=['adminer']
)

k8s_yaml('deploy/postgres/postgres-pv.yaml')
k8s_yaml('deploy/postgres/postgres-pvc.yaml')
k8s_yaml('deploy/postgres/postgres-secret.yaml')
k8s_yaml('deploy/postgres/postgres.yaml')

k8s_resource(
    'postgres',
    port_forwards='5737:5432',
    labels=['database']
)

local_resource('push-prisma-postgres', cmd='./push-prisma-postgres.sh', trigger_mode=TRIGGER_MODE_MANUAL, allow_parallel=True)

tiltfile_path = config.main_path
