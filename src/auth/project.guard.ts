import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { ProjectService } from 'src/project/project.service';

@Injectable()
export class PorjectGuard implements CanActivate {
    constructor(private readonly projectService: ProjectService) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { clientid, clientsecret } = request.headers;
        console.log('clientid', clientid);
        console.log('clientsecret', clientsecret);
        if (!clientid || !clientsecret) {
            throw new UnauthorizedException('Enter valid clientId and clientSecret');
        }

        const project = await this.projectService.findByClientId(clientid);
        console.log('project', project);
        if (!project) {
            throw new UnauthorizedException('Enter valid clientId and clientSecret');
        }
        request.project = project;

        return true;
    }
}
