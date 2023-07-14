import json

import django.shortcuts as dj_scut

from . import pronunciation as pron


def index(request):
    return dj_scut.render(request, 'application/index.html')


def to_ipa__get(request):
    input_code = request.GET.get('input')
    try:
        ipa_code = pron.code_to_ipa(input_code)
        data = {'ipa_code': ipa_code, }
    except ValueError as e:
        data = {'error': str(e), }
    return dj_scut.HttpResponse(json.dumps(data), content_type='application/json')


def from_ipa__get(request):
    input_code = request.GET.get('input')
    try:
        code = pron.ipa_to_code(input_code)
        data = {'pronunciation_code': code, }
    except ValueError as e:
        data = {'error': str(e), }
    return dj_scut.HttpResponse(json.dumps(data), content_type='application/json')
