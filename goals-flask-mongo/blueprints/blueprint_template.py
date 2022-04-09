from flask import Blueprint, jsonify

blueprint_template = Blueprint('blueprint_template', __name__,
                        template_folder='templates')

@blueprint_template.route('/trigger')
def hasTriggered():
    return jsonify({
        'status': 'get triggered successfully',
        'message': 'woo'
    })